import {
  addPanel,
  arrangePanelsGrid,
  updatePanel,
  savePanels,
  hideAllPanels,
  showAllPanels,
  arrangePanelsStack,
} from '../features/panels/panelSlice';

const Control = (dispatch, type, ...args) => {
  const { panel } = args[0];
  // eslint-disable-next-line no-unused-vars
  const [e, ...eventArgs] = args.slice(1);

  switch (type) {
    case 'Add':
      dispatch(addPanel(panel));
      break;
    case 'Update':
      dispatch(updatePanel(args[0]));
      break;
    case 'Save':
      const { setSnackbarOpen } = args[0];
      dispatch(savePanels(panel));
      setSnackbarOpen(true);
      break;
    case 'Drag':
      const data = eventArgs[0];
      dispatch(updatePanel({ ...panel, x: data.x, y: data.y }));
      break;
    case 'Resize':
      // eslint-disable-next-line no-unused-vars
      const [direction, ref, delta, position] = eventArgs;
      const width = parseFloat(ref.style.width);
      const height = parseFloat(ref.style.height);
      if (!isNaN(width) && !isNaN(height)) {
        dispatch(
          updatePanel({
            ...panel,
            width,
            height,
            x: position.x,
            y: position.y,
          })
        );
      }
      break;
    case 'HideAll':
      dispatch(hideAllPanels());
      break;
    case 'ShowAll':
      dispatch(showAllPanels());
      break;
    case 'GridSort':
      dispatch(arrangePanelsGrid());
      break;
    case 'StackSort':
      dispatch(arrangePanelsStack());
      break;
    default:
      throw new Error(`Unknown control type: ${type}`);
  }
};

export const createControl = (dispatch, type, ...args) => {
  return (...eventArgs) => Control(dispatch, type, ...args, ...eventArgs);
};
