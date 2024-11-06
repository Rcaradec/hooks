import { useMemo, useState } from "react";

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
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import {
  initialTodos,
  todoCategories,
  TodoCategory,
  Todo,
} from "../../data/initialTodos";

const FilteredTodoList = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    TodoCategory | undefined
  >(undefined);
  const handleChange = (e: SelectChangeEvent<string>) => {
    const selectedValue = e.target.value;
    const category = todoCategories.find((cat) => cat.name === selectedValue);
    setSelectedCategory(category);
  };

  const cachedVisibleTodos: Todo[] = useMemo(() => {
    return selectedCategory
      ? initialTodos.filter((todos) => todos.category === selectedCategory.name)
      : initialTodos;
  }, [selectedCategory]);

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
                <ListItem>
                  <ListItemText primary={todo.text} secondary={todo.category} />
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="outlined"
          onClick={() => setSelectedCategory(undefined)}
        >
          Reset Categories
        </Button>
      </Box>
    </>
  );
};

export default FilteredTodoList;
