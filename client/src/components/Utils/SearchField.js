import { InputBase, Paper, Divider, IconButton } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import useStyles from "../../theme/styles";

const SearchField = ({ updateSearch, placeholder, search, ResetSearch }) => {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.searchRoot}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": { placeholder } }}
        onChange={updateSearch}
        value={search}
      />

      <Divider className={classes.divider} orientation="vertical" />

      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        disabled={!search}
        onClick={ResetSearch}
      >
        {search ? <Close /> : <Search />}
      </IconButton>
    </Paper>
  );
};

export default SearchField;
