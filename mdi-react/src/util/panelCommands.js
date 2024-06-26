// src/utils/panelCommands.js
import {
  addPanel,
  arrangePanelsGrid,
  arrangePanelsStack,
  hideAllPanels,
  showAllPanels,
  updatePanel,
  bringToFront,
  savePanels,
} from '../features/panels/panelSlice';

export const panelCommands = (dispatch) => ({
  Save: (panel) => {
    dispatch(savePanels(panel));
  },
  Add: (panel) => dispatch(addPanel(panel)),
  Update: (panel) => dispatch(updatePanel(panel)),
  HideAll: () => dispatch(hideAllPanels()),
  ShowAll: () => dispatch(showAllPanels()),
  GridSort: () => dispatch(arrangePanelsGrid()),
  StackSort: () => dispatch(arrangePanelsStack()),
  BringToFront: (panelId) => dispatch(bringToFront(panelId)),
  Drag: (panel) => (e, data) =>
    dispatch(updatePanel({ ...panel, x: data.x, y: data.y })),
  Resize: (panel) => (e, direction, ref, delta, position) => {
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
  },
});
