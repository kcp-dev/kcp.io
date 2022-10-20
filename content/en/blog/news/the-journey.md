---
title: "kcp - the journey"
linkTitle: "kcp - the journey"
date: 2022-10-19
---

One and a half years ago at KubeCon 2021 in Amsterdam, [Clayton Coleman sent us on a journey](https://www.youtube.com/watch?v=Xd0uzgZqYgk):

What if we took Kubernetes – as we had created it as a community over 7 years ago – and removed all Pod-related resources and everything that is not clearly of generic use, resulting in a generic control plane?

What if we further split clusters hosting many applications into very small **logical clusters** with one application each, and each application owner just chooses and picks the additional APIs necessary for that application? And what if a logical cluster is cheap, super cheap, and super quick to create, as cheap and quick as a namespace creation?

These are two foundational and yet technically small changes in the architecture of Kubernetes. Today everybody takes for granted that Kubernetes is tightly coupled with a large number of built-in APIs, the API monolith we all know, and that clusters must be shared because of the large overhead of creating and running one more cluster, both in resource cost and management overhead.

<a href="https://www.youtube.com/watch?v=Xd0uzgZqYgk">
<img src="/images/keynote-clayton-2020.png#center" alt="Kubernetes as the Control Plane for the Hybrid Cloud"/>
</a>

While prototyping the system over the past 15 months, we quickly realized that the small size but the large number of 
logical clusters opens up a green field for innovation: a logical cluster alone, even if we re-add the well-known workload APIs, is not a very exciting idea. Projects in the ecosystem like [k3s](https://k3s.io/), [vcluster](https://github.com/loft-sh/vcluster) or service offerings like [Civo](https://civo.com) have pioneered small, personal clusters for years. With logical clusters we are trying to go farther by reducing the control plane cost by another magnitude or two, giving these companies a tool for optimizing their services even more. But the real value and the actual innovation happens when re-connecting those new logical clusters into something bigger.

This "something bigger" can have different shapes. Let's look at the use-cases we encountered.
 
# Hierarchies and other Relationships

If we have hundreds or thousands of clusters as one company, we will start thinking about how to organize them. One model we explored early on is a logical cluster hierarchy, like a traditional file system with a directory tree, logical clusters organized in a tree. We call the logical clusters here workspaces, and workspaces are nested, as file system directories are nested.

Similarly to file systems, the workspaces have no shared logic, other than the fact that workspace access somehow depends on access to a parent workspace. As outlined in Clayton's original prototype, every workspace, nested or not, has an independent set of resources.

Another option for logical cluster organization could be that established by Google with their Docs office suite, where a folder structure exists, but most users actually just share links to documents or invite collaborators to existing documents. With that model, documents are not much inter-connected in reality in an organized way, but rather form an organic web with references by global ID (URL). Even such a model is totally compatible with the logical cluster concept.

# Sharing APIs

With thousands of workspaces in a platform, each starting out with only a small set of generic APIs that are not very useful on their own, we realized that we need an easy mechanism for users to choose additional APIs and add them to their workspace.

CustomResourceDefinitions are provided by Kubernetes and kcp supports them as well. We knew that managing CRDs can already become a nightmare with a few handful of Kubernetes clusters. With a number in the thousands that's likely not a good approach. Hence, we started wondering whether there aren't ways to share resources between workspaces. This sounds a lot like forcing workspaces and their owners to agree on APIs, i.e. the big inconvenience of big clusters that all users must agree on the operator versions or other extensions to the cluster.

So what if we want shared APIs, but give a user still the choice which API version or service version to choose? What we have implemented is a model where APIs are published through an APIExport by a service provider in one workspace, and consumers may add the exported APIs to their workspaces through the creation of APIBindings pointing to the export.

Some readers might be scared: "the kcp project is building proprietary APIs here and diverge from Kube". We can assure: everything we are building with APIExports and APIBindings is heavily based on CRDs and all its technology and ecosystem around. APIExports and APIBindings are a higher level API that eventually, further down, creates (technically invisible) CRDs. All the features and the tooling of CRDs can be used. Existing CRDs can be exposed with APIExports.

We like to say that Kubernetes is at the core of kcp. And this is the perfect example: APIExport/APIBinding-based resources are served through apiextension-apiserver and with that are 100% compatible to Kubernetes API conventions. That's one of the rules we set in stone in the project:

# A workspace is Kubernetes. No compromises.

with the nuance that we intentionally disable workload APIs to start fresh as a generic control plane.

# Towards a new Extension Model for Service Providers

We have mentioned one subtle, innocently looking detail where APIExports/APIBindings differ from normal CRDs, and this has a giant consequence for the philosophy of how people think of APIs in kcp:

In a workspace that is bound to an API of e.g. widgets, provided by an API service provider in another workspace, the user can do `kubectl get widgets` as expected, but a `kubectl get crd widgets.group.com` will not show anything.

This detail suggests that the CustomResourceDefinition, the life-cycle of it, is completely in the hands of the service provider. Classically in Kubernetes, a custom resource is defined by a CRD, and an operator both provides the CRD (= manages its life-cycle), and at the same time also runs controllers to implement the actual logic of the CustomResources, e.g. widgets in our example.

And now the final technical step: if the CRD is managed by a service provider, why not let the service provider run the controllers too.

**This is a powerful thought!** It has the potential to disrupt how we think about custom resources in Kubernetes as a whole!

Think about it: in this model the user, for the first time, can really pick & choose just the API. No thought about where it comes from, who operates it, which operator adds the logic and whether the operator is still maintained in a year from now, or whether there is even an operator involved to add behaviour to custom resources. The API, and only the API becomes the interface. Call it the contract between user and service provider. This is a change in philosophy.

And there we are: we have built an extension mechanism for multi-tenant services. Workspaces give us isolation for logical clusters, i.e. multi-tenancy and APIExport+APIBinding allow a service provider to publish an API to many tenants and run controllers to act on the resource. This is a persona the Kubernetes ecosystem has not known.

Of course, there are many more details about how a multi-tenant controller actually looks like. How can the service provider access tenant data both securely and efficiently? How does this scale? But this is a topic for another post.

# Massive Multi-Tenancy

Some readers at this point will argue that multi-tenancy on Kubernetes has been solved, even for operators and APIs. [Red Hat's Operator Life-Cycle Operator (OLM)](https://olm.operatorframework.io/) for example allows to delegate operator installation to users and it explores ways for multi-tenant operators. Also OpenShift and others have implemented multi-tenancy on-top of Kubernetes for a long time.

Furthermore, projects around the [vcluster](https://www.vcluster.com/) idea found other ways to implement multi-tenancy. In a vcluster setup users can even install their own CRDs.

What all these approaches have in common is that they are somewhere on a spectrum between strength of isolation and being cheap. You cannot have both. Cheap here means the resource overhead (cpu & memory & administration) per tenant. Running multiple real Kubernetes clusters gives perfect isolation, but scores poorly on the cost and administrative complexity scale. vcluster gives pretty good isolation, but is still kind of heavy, and needs administrational tools to keep that part of the story under control. What these solutions do is that they do kube, more kube, sometimes many more kube. But they use kube mostly unmodified.

Part of Clayton's mandate was to think outside of the box, to question foundational choices we have made in kube 7 or 8 years ago.

Already in Clayton's original prototype, he had basically added namespacing to kube-apiserver, i.e. something similar to namespacing in the Linux kernel which eventually made Docker and containers per se possible. Technically, Clayton's prototype did the same thing, to eventually allow it to serve isolated clusters under `/clusters/user` through a shared kernel, the Kubernetes control plane.

What if we build a system that can be deployed with many apiservers, all behind a load-balancer, and each serves a subset, a partition of the logical clusters under `/clusters/<logical-cluster-name>`. Then we could scale up horizontally as much as we want.

Well, of course there is lots more to think about here. But that thought fundamentally is correct. That's what we have done. The complications here are that we are talking about cross-workspace logic like APIExports and APIBindings (and other APIs we are building). An apiserver (we call them shards) needs certain knowledge about the global state. In this case, every shard must know about APIExports, and a multi-tenant controller must know about APIBindings and how to access shards.

So a large focus of the kcp project is to explore and implement API patterns that allow this horizontal scaling. An intentional trick here is that every logical cluster aka workspace is 100% Kubernetes API convention conformant. Cross-workspace we have more freedom. Clearly, this is a crucial insight to scale up horizontally without trying to solve the CAP theorem on that path.

# What have we Built?

Very early on, we figured that

    kcp is an ideal platform for massively multi-tenant service providers.

This eventually became the slogan on our website kcp.io. We have seen

1. how APIExports and APIBindings allow a service provider extension model.
2. how small, mostly independent clusters allow horizontal scaling.
3. how the secret sauce (actually not so secret as everything we are doing here is open) is to combine (1) and (2) by coming up with API abstractions that don't conflict with horizontal scaling, e.g. that can survive network splits and network latency across the globe.

On this road, we have repeatedly observed colleagues realizing the power of (1) and (2), switching their head from that of a product developer to that of a service provider developer, seeing people inspired by the power for a service provider platform for them.

Our vision is that – with a globally running instance of kcp – **one engineer** can bring a service idea from inception to billing the customers down from many many months of work to a few weeks at max. Empower the engineers.

With Kubernetes, 7 or 8 years ago we got a multi-machine compute platform. It turned running workloads planet-scale from super complex into a commodity functionality of an open-source project. With kcp we aim at making building multi-tenant APIs boring. A next step on this journey. Multi-tenant APIs that can be shared. APIs that can be composed. APIs that are not caught in individual clusters. With that we hope to contribute to an ecosystem that can

- innovate faster,
- collaborate more,
- and most importantly: can bring value to our users in a shorter time.
