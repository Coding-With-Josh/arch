import { Handle, Position, NodeProps } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import { Zap, Filter, Mail, Clock } from "lucide-react";

const baseNodeStyles = "px-4 py-2 rounded-md shadow-md border min-w-[150px]";

export function TriggerNode({ data, selected }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-yellow-50 border-yellow-200`}>
      <NodeResizer minWidth={150} minHeight={50} isVisible={selected} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-yellow-500" />
        <div>
          <div className="font-medium text-sm">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>
    </div>
  );
}

export function ActionNode({ data, selected }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-blue-50 border-blue-200`}>
      <NodeResizer minWidth={150} minHeight={50} isVisible={selected} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-blue-500" />
        <div>
          <div className="font-medium text-sm">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>
    </div>
  );
}

export function ConditionalNode({ data, selected }: NodeProps) {
  return (
    <div className={`${baseNodeStyles} bg-purple-50 border-purple-200`}>
      <NodeResizer minWidth={150} minHeight={50} isVisible={selected} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="yes" />
      <Handle type="source" position={Position.Right} id="no" />
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-purple-500" />
        <div>
          <div className="font-medium text-sm">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>
    </div>
  );
}
