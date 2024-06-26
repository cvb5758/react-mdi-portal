// Panel.js
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Rnd } from 'react-rnd';
import { Paper, Box } from '@mui/material';
import PanelHeader from './PanelHeader';
import useClock from '../../hooks/useClock';
import PanelContent from './PanelContent';
import { panelCommands } from '../../util/panelCommands';

const Panel = ({ panel }) => {
  const dispatch = useDispatch();
  const commands = panelCommands(dispatch);
  const panelRef = useRef(null);
  const currentTime = useClock(panel.timezone);

  const handleClick = () => {
    commands.BringToFront(panel.id);
  };

  return (
    <Rnd
      size={{ width: panel.width, height: panel.height }}
      position={{ x: panel.x, y: panel.y }}
      onDragStop={commands.Drag(panel)}
      onResizeStop={commands.Resize(panel)}
      onMouseDown={handleClick}
      minWidth={100}
      minHeight={100}
      bounds="parent"
    >
      <Box
        ref={panelRef}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Paper
          component="section"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 2px 2px 0px #C7C7C752, 0px 9px 6px 0px #A7A7A72E',
          }}
        >
          <PanelHeader panel={panel} />
          <PanelContent {...panel} currentTime={currentTime} />
        </Paper>
      </Box>
    </Rnd>
  );
};

export default Panel;
