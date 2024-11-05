import { forceSimulation, forceLink, forceManyBody, forceX, forceY, SimulationNodeDatum } from 'd3-force';
import { useEffect, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useNodesInitialized,
  Node,
  BackgroundVariant,
  Controls,
  MiniMap,
  Background,
  ReactFlowProvider,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 0 }, data: { label: '2' } },
  { id: '3', position: { x: 0, y: 0 }, data: { label: '3' } },
  { id: '4', position: { x: 0, y: 0 }, data: { label: '4' } },
  { id: '5', position: { x: 0, y: 0 }, data: { label: '5' } },
  { id: '6', position: { x: 0, y: 100 }, data: { label: '6' } },
  { id: '7', position: { x: 0, y: 100 }, data: { label: '7' } },
  { id: '8', position: { x: 0, y: 100 }, data: { label: '8' } },
  { id: '9', position: { x: 0, y: 100 }, data: { label: '9' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e1-4', source: '1', target: '4' },
  { id: 'e1-5', source: '1', target: '5' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e6-9', source: '6', target: '9' },
];

import { collide } from './collide.js';

import '@xyflow/react/dist/style.css';

type ForceNode = Node & {
  fx?: number;
  fy?: number;
};

const simulation = forceSimulation()
  .force('charge', forceManyBody().strength(-1000))
  .force('x', forceX().x(0).strength(0.05))
  .force('y', forceY().y(0).strength(0.05))
  .force('collide', collide())
  .alphaTarget(0.05)
  .stop();

type DragEvents = {
  start: (event: React.MouseEvent, node: ForceNode) => void;
  drag: (event: React.MouseEvent, node: ForceNode) => void;
  stop: () => void;
};

// Define a type for the return value of useLayoutedElements
type LayoutedElementsReturn = [boolean, { toggle: () => void; isRunning: () => boolean }, DragEvents];

// Update the useLayoutedElements function return type
const useLayoutedElements = (): LayoutedElementsReturn => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();

  const initialized = useNodesInitialized();

  // You can use these events if you want the flow to remain interactive while
  // the simulation is running. The simulation is typically responsible for setting
  // the position of nodes, but if we have a reference to the node being dragged,
  // we use that position instead.
  const draggingNodeRef = useRef<ForceNode | null>(null);

  const dragEvents = useMemo<DragEvents>(
    () => ({
      start: (_event: React.MouseEvent, node: ForceNode) => (draggingNodeRef.current = node),
      drag: (_event: React.MouseEvent, node: ForceNode) => (draggingNodeRef.current = node),
      stop: () => (draggingNodeRef.current = null),
    }),
    [],
  );

  return useMemo(() => {
    const nodes = getNodes().map((node: ForceNode) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));
    const edges = getEdges().map((edge) => edge);
    let running = false;

    // If React Flow hasn't initialized our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (!initialized || nodes.length === 0) return [false, { toggle: () => {}, isRunning: () => false }, dragEvents];

    simulation.nodes(nodes).force(
      'link',
      forceLink(edges)
        .id((d: SimulationNodeDatum) => (d as ForceNode).id)
        .strength(0.05)
        .distance(100),
    );

    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = () => {
      getNodes().forEach((node, i) => {
        const dragging = draggingNodeRef.current?.id === node.id;

        // Setting the fx/fy properties of a node tells the simulation to "fix"
        // the node at that position and ignore any forces that would normally
        // cause it to move.
        if (dragging) {
          nodes[i].fx = draggingNodeRef.current?.position.x;
          nodes[i].fy = draggingNodeRef.current?.position.y;
        } else {
          delete nodes[i].fx;
          delete nodes[i].fy;
        }
      });

      simulation.tick();
      setNodes(
        nodes.map((node) => ({
          ...node,
          position: { x: node.fx ?? node.x, y: node.fy ?? node.y },
        })),
      );

      window.requestAnimationFrame(() => {
        // Give React and React Flow a chance to update and render the new node
        // positions before we fit the viewport to the new layout.
        fitView();
        // If the simulation hasn't been stopped, schedule another tick.
        if (running) tick();
      });
    };

    const toggle = () => {
      if (!running) {
        getNodes().forEach((node, index) => {
          const simNode = nodes[index];
          Object.assign(simNode, node);
          simNode.x = node.position.x;
          simNode.y = node.position.y;
        });
      }
      running = !running;
      running && window.requestAnimationFrame(tick);
    };

    const isRunning = () => running;
    return [true, { toggle, isRunning }, dragEvents];
  }, [initialized, dragEvents, getNodes, getEdges, setNodes, fitView]);
};

const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [initialized, { toggle, isRunning }, dragEvents] = useLayoutedElements();
  useEffect(() => {
    if (initialized) {
      toggle();
      const timer = setTimeout(() => {
        toggle();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [initialized, toggle]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeDragStart={dragEvents.start}
      onNodeDrag={dragEvents.drag}
      onNodeDragStop={dragEvents.stop}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <Panel>
        {initialized && <button onClick={toggle}>{isRunning() ? 'Stop' : 'Start'} force simulation</button>}
      </Panel>
    </ReactFlow>
  );
};

export default function Graph() {
  return (
    <div style={{ width: '75vw', height: '50vh' }}>
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  );
}
