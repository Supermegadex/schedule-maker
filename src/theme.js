import { createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/deepOrange';
import purple from 'material-ui/colors/deepPurple';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: orange
  },
});

export default theme;