---
title: Workspace CRD schema reference (group tenancy.kcp.dev)
linkTitle: Workspace
description: |
  Workspace defines a generic Kubernetes-cluster-like endpoint, with standard Kubernetes discovery APIs, OpenAPI and resource API endpoints. 
   A workspace can be backed by different concrete types of workspace implementation, depending on access pattern. All workspace implementations share the characteristic that the URL that serves a given workspace can be used with standard Kubernetes API machinery and client libraries and command line tools.
weight: 100
crd:
  name_camelcase: Workspace
  name_plural: workspaces
  name_singular: workspace
  group: tenancy.kcp.dev
  technical_name: workspaces.tenancy.kcp.dev
  scope: Cluster
  source_repository: https://github.com/kcp-dev/kcp
  source_repository_ref: v0.8.2
  versions:
    - v1beta1
  topics:
    - tenancy
    - workspaces
layout: crd
owner:
  - https://github.com/kcp-dev/kcp
aliases:
  - /reference/cp-k8s-api/workspaces.tenancy.kcp.dev/
technical_name: workspaces.tenancy.kcp.dev
source_repository: https://github.com/kcp-dev/kcp
source_repository_ref: v0.8.2
---

# Workspace


<p class="crd-description">Workspace defines a generic Kubernetes-cluster-like endpoint, with standard Kubernetes discovery APIs, OpenAPI and resource API endpoints. 
 A workspace can be backed by different concrete types of workspace implementation, depending on access pattern. All workspace implementations share the characteristic that the URL that serves a given workspace can be used with standard Kubernetes API machinery and client libraries and command line tools.</p>
<dl class="crd-meta">
<dt class="fullname">Full name:</dt>
<dd class="fullname">workspaces.tenancy.kcp.dev</dd>
<dt class="groupname">Group:</dt>
<dd class="groupname">tenancy.kcp.dev</dd>
<dt class="singularname">Singular name:</dt>
<dd class="singularname">workspace</dd>
<dt class="pluralname">Plural name:</dt>
<dd class="pluralname">workspaces</dd>
<dt class="scope">Scope:</dt>
<dd class="scope">Cluster</dd>
<dt class="versions">Versions:</dt>
<dd class="versions"><a class="version" href="#v1beta1" title="Show schema for version v1beta1">v1beta1</a></dd>
</dl>



<div class="crd-schema-version">
<h2 id="v1beta1">Version v1beta1</h2>



<h3 id="property-details-v1beta1">Properties</h3>


<div class="property depth-0">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.apiVersion">.apiVersion</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: <a href="https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources">https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources</a></p>

</div>

</div>
</div>

<div class="property depth-0">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.kind">.kind</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: <a href="https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds">https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds</a></p>

</div>

</div>
</div>

<div class="property depth-0">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.metadata">.metadata</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">object</span>

</div>

</div>
</div>

<div class="property depth-1">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.metadata.name">.metadata.name</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

</div>
</div>

<div class="property depth-0">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.spec">.spec</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">object</span>
<span class="property-required">Required</span>
</div>

<div class="property-description">
<p>WorkspaceSpec holds the desired state of the ClusterWorkspace.</p>

</div>

</div>
</div>

<div class="property depth-1">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.spec.type">.spec.type</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">object</span>

</div>

<div class="property-description">
<p>type defines properties of the workspace both on creation (e.g. initial resources and initially installed APIs) and during runtime (e.g. permissions). If no type is provided, the default type for the workspace in which this workspace is nesting will be used.
 The type is a reference to a ClusterWorkspaceType in the listed workspace, but lower-cased. The ClusterWorkspaceType existence is validated at admission during creation. The type is immutable after creation. The use of a type is gated via the RBAC clusterworkspacetypes/use resource permission.</p>

</div>

</div>
</div>

<div class="property depth-2">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.spec.type.name">.spec.type.name</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>
<span class="property-required">Required</span>
</div>

<div class="property-description">
<p>name is the name of the ClusterWorkspaceType</p>

</div>

</div>
</div>

<div class="property depth-2">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.spec.type.path">.spec.type.path</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>path is an absolute reference to the workspace that owns this type, e.g. root:org:ws.</p>

</div>

</div>
</div>

<div class="property depth-0">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status">.status</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">object</span>

</div>

<div class="property-description">
<p>WorkspaceStatus communicates the observed state of the Workspace.</p>

</div>

</div>
</div>

<div class="property depth-1">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.URL">.status.URL</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>
<span class="property-required">Required</span>
</div>

<div class="property-description">
<p>url is the address under which the Kubernetes-cluster-like endpoint can be found. This URL can be used to access the workspace with standard Kubernetes client libraries and command line tools.</p>

</div>

</div>
</div>

<div class="property depth-1">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions">.status.conditions</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">array</span>

</div>

<div class="property-description">
<p>Current processing state of the ClusterWorkspace.</p>

</div>

</div>
</div>

<div class="property depth-2">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions[*]">.status.conditions[*]</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">object</span>

</div>

<div class="property-description">
<p>Condition defines an observation of a object operational state.</p>

</div>

</div>
</div>

<div class="property depth-3">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions[*].lastTransitionTime">.status.conditions[*].lastTransitionTime</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>
<span class="property-required">Required</span>
</div>

<div class="property-description">
<p>Last time the condition transitioned from one status to another. This should be when the underlying condition changed. If that is not known, then using the time when the API field changed is acceptable.</p>

</div>

</div>
</div>

<div class="property depth-3">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions[*].message">.status.conditions[*].message</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>A human readable message indicating details about the transition. This field may be empty.</p>

</div>

</div>
</div>

<div class="property depth-3">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions[*].reason">.status.conditions[*].reason</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>The reason for the condition&rsquo;s last transition in CamelCase. The specific API may choose whether or not this field is considered a guaranteed API. This field may not be empty.</p>

</div>

</div>
</div>

<div class="property depth-3">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions[*].severity">.status.conditions[*].severity</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>Severity provides an explicit classification of Reason code, so the users or machines can immediately understand the current situation and act accordingly. The Severity field MUST be set only when Status=False.</p>

</div>

</div>
</div>

<div class="property depth-3">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions[*].status">.status.conditions[*].status</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>
<span class="property-required">Required</span>
</div>

<div class="property-description">
<p>Status of the condition, one of True, False, Unknown.</p>

</div>

</div>
</div>

<div class="property depth-3">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.conditions[*].type">.status.conditions[*].type</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>
<span class="property-required">Required</span>
</div>

<div class="property-description">
<p>Type of condition in CamelCase or in foo.example.com/CamelCase. Many .condition.type values are consistent across resources like Available, but because arbitrary conditions can be useful (see .node.status.conditions), the ability to deconflict is important.</p>

</div>

</div>
</div>

<div class="property depth-1">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.initializers">.status.initializers</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">array</span>

</div>

<div class="property-description">
<p>initializers are set on creation by the system and must be cleared by a controller before the workspace can be used. The workspace will stay in the phase &ldquo;Initializing&rdquo; state until all initializers are cleared.
 A cluster workspace in &ldquo;Initializing&rdquo; state are gated via the RBAC clusterworkspaces/initialize resource permission.</p>

</div>

</div>
</div>

<div class="property depth-2">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.initializers[*]">.status.initializers[*]</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>ClusterWorkspaceInitializer is a unique string corresponding to a cluster workspace initialization controller for the given type of workspaces.</p>

</div>

</div>
</div>

<div class="property depth-1">
<div class="property-header">
<h3 class="property-path" id="v1beta1-.status.phase">.status.phase</h3>
</div>
<div class="property-body">
<div class="property-meta">
<span class="property-type">string</span>

</div>

<div class="property-description">
<p>Phase of the workspace (Initializing / Active / Terminating). This field is ALPHA.</p>

</div>

</div>
</div>





</div>



