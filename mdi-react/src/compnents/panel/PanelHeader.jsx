import { Box, Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { panelCommands } from '../../util/panelCommands';

const PanelHeader = ({ panel }) => {
  const dispatch = useDispatch();
  const commands = panelCommands(dispatch);

  const handleMaximize = () => {
    commands.Update({
      ...panel,
      isMaximized: !panel.isMaximized,
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight - 90,
    });
  };

  const handleMinimize = () => {
    commands.Update({
      ...panel,
      isHide: !panel.isHide,
    });
  };

  const handleClose = () => {
    commands.Update({ ...panel, isClose: true });
  };

  return (
    <header
      className="panel-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'move',
        height: '3.6rem',
        backgroundColor: '#F5F5F5',
        color: '#3B3B3B',
        borderRadius: '0.6rem 0.6rem 0 0',
        border: '1px solid #D3D3D3',
        width: '100%',
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0rem 1.2rem',
          height: '1.6rem',
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            fontSize: '1.3rem',
            fontWeight: '700',
          }}
        >
          {panel.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '0.4rem',
          }}
        >
          <IconButton
            size="small"
            onClick={handleMaximize}
            style={{
              color: '#3B3B3B',
            }}
          >
            <img src="/logo/ic_add.svg" alt="" style={{}} />
          </IconButton>
          <IconButton size="small" onClick={handleMinimize}>
            <img src="/logo/ic_down.svg" alt="" />
          </IconButton>
          <IconButton size="small" onClick={handleClose}>
            <img src="/logo/ic_close_s.svg" alt="close" />
          </IconButton>
        </Box>
      </Stack>
    </header>
  );
};

export default PanelHeader;
