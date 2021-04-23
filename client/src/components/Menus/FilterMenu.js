import { Popover, ListItem, ListItemText } from "@material-ui/core";

export default function FilterMenu({ anchorEl, handleClose, handleFilter }) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            // width: 180,
            overflow: "unset",
            // marginTop: 3,
          },
        }}
      >
        <ListItem button onClick={() => handleFilter("all")}>
          <ListItemText primary="All Products" />
        </ListItem>
        <ListItem button onClick={() => handleFilter("")}>
          <ListItemText primary="Filtered Products" />
        </ListItem>
      </Popover>
    </div>
  );
}
