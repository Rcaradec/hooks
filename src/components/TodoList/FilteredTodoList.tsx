import {
  Button,
  Box,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { todoCategories, Todo, TodoCategory } from "../../data/initialTodos";
import { Link } from "react-router-dom";

type Props = {
  handleChange: (e: SelectChangeEvent<string>) => void;
  cachedVisibleTodos: Todo[];
  selectedCategory: TodoCategory | undefined;
  setSelectedCategory: (category: TodoCategory | undefined) => void;
  handleTodoElem: (todo: Todo) => void;
};

const FilteredTodoList = ({
  handleChange,
  cachedVisibleTodos,
  selectedCategory,
  setSelectedCategory,
  handleTodoElem,
}: Props) => {
  return (
    <>
      <Box
        component="section"
        sx={{ backgroundColor: "#f0f0f0", padding: 2, width: "800px" }}
      >
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Please select a category
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="select-category">Select</InputLabel>
          <Select
            labelId="category-select"
            id="category-select"
            value={selectedCategory?.name || ""}
            label="Category"
            onChange={handleChange}
          >
            {todoCategories.map((elem) => (
              <MenuItem key={elem.id} value={elem.name}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          {cachedVisibleTodos.map((todo) => (
            <Grid item xs={12} sm={6} key={todo.id}>
              <List>
                <ListItem
                  component={Link}
                  to={`/todo/${todo.id}`}
                  onClick={() => handleTodoElem(todo)}
                >
                  <ListItemText primary={todo.text} secondary={todo.category} />
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="outlined"
          onClick={() => setSelectedCategory(undefined)}
          sx={{ marginTop: 5 }}
        >
          Reset Categories
        </Button>
      </Box>
    </>
  );
};

export default FilteredTodoList;
