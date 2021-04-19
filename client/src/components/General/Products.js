import { useState, useEffect, useRef } from "react";
import {
  Typography,
  Grid,
  Button,
  Paper,
  Backdrop,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../../theme/styles";
import Wrapper from "./Wrapper";
import SearchField from "../Utils/SearchField";
import { Add } from "@material-ui/icons";
import CreateProduct from "../Modals/CreateProduct";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Utils/Loader";
import { getAllProducts } from "../../actions/productAction";
import MIcon from "../Utils/MIcon";
import { ReactComponent as Filter } from "../../theme/assets/filter.svg";
import FilterMenu from "../Menus/FilterMenu";
import ProductsSkeleton from "../Utils/ProductsSkeleton";

const Products = ({ toggleTheme }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cleanupRef = useRef(null);

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [check, setCheck] = useState(null);
  const [open, setOpen] = useState(false);
  const [getId, setGetId] = useState(null);
  const [pageSize, setPageSize] = useState(6);
  const [filter, setFilter] = useState("");
  const { products, loading } = useSelector((state) => state.product);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    cleanupRef.current = true;
    if (pageSize && filter) {
      dispatch(getAllProducts(pageSize, filter));
    }
    return () => {
      cleanupRef.current = null;
      dispatch({
        type: "RESET_PRODUCT",
      });
    };
  }, [pageSize, dispatch, filter]);

  const loadMoreAction = () => {
    setPageSize((prev) => prev * 2);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
    handleCloseFilter();
  };

  const handleExpandClick = (i) => {
    const isId = products.findIndex((_, index) => index === i);
    const product = products.filter((_, index) => index === i);

    setGetId(product[0]._id);
    setExpanded((prev) => !prev);
    setCheck(isId);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value.substr(0, 20));
  };

  const ResetSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };

  const filteredProducts = () =>
    products === undefined
      ? []
      : products?.filter((row) => {
          if (search !== "") {
            return (
              row?.location?.formattedAddress
                ?.toString()
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1 ||
              row?.user?.username
                ?.toString()
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1 ||
              row?.name
                ?.toString()
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1
            );
          } else {
            return row;
          }
        });

  return (
    <Wrapper {...{ toggleTheme }}>
      <CreateProduct {...{ open, handleClose, pageSize, filter }} />
      <FilterMenu
        {...{ anchorEl, handleClose: handleCloseFilter, handleFilter }}
      />
      <div className={classes.p30} ref={cleanupRef}>
        <Typography
          variant="overline"
          gutterBottom
          className={clsx(classes.subtitle)}
        >
          Products
        </Typography>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.mt20}
          spacing={3}
        >
          <Grid item>
            <SearchField
              {...{
                updateSearch,
                ResetSearch,
                search,
                placeholder: "Type Something...",
              }}
            />
          </Grid>
          <Grid item>
            <Button
              startIcon={<Add />}
              color="primary"
              variant="contained"
              size="large"
              onClick={handleOpen}
            >
              Create Product
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <div className={classes.p5}>
            <ProductsSkeleton />
          </div>
        ) : (
          <div className={classes.mt20}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.mb2}
            >
              <Grid item></Grid>
              <Grid item>
                <IconButton size="small" onClick={handleClick}>
                  <MIcon src={Filter} fontSize="large" color="inherit" />
                </IconButton>
              </Grid>
            </Grid>

            <ProductList
              {...{
                products: filteredProducts,
                handleExpandClick,
                expanded,
                setExpanded,
                check,
                productId: getId,
                pageSize,
                filter,
              }}
            />
          </div>
        )}
      </div>
      {loading
        ? null
        : filteredProducts?.()?.length === 0 && (
            <Paper
              variant="outlined"
              elevation={0}
              className={classes.noProducts}
            >
              <img src="/img/oops.png" alt="Oops" />
              <Typography className={clsx(classes.title, classes.boldText)}>
                There are no products available in your current location.
              </Typography>
            </Paper>
          )}

      <div className={classes.centered}>
        {filteredProducts().length > 5 && (
          <Button
            variant="outlined"
            disabled={loading}
            endIcon={loading && <Loader />}
            onClick={loadMoreAction}
          >
            {loading ? null : "Load more..."}
          </Button>
        )}
      </div>

      <Backdrop className={classes.backdrop} open={loading}>
        <Loader />
      </Backdrop>
    </Wrapper>
  );
};

export default Products;
