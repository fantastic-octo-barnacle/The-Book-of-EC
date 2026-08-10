import type { NodeId } from "./nodes.ts"

const validNodeId: NodeId = "embedded.gpio"

// @ts-expect-error NodeId 只能取节点注册表中已经声明的键。
const unknownNodeId: NodeId = "embedded.unknown"

const validRelation = { target: "engineering.shell-basics" } satisfies { target: NodeId }

// @ts-expect-error 关系目标必须是已注册的 NodeId。
const invalidRelation = { target: "engineering.unknown" } satisfies { target: NodeId }

void validNodeId
void unknownNodeId
void validRelation
void invalidRelation
