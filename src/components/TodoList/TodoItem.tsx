import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Todo } from "../../data/initialTodos";

type Props = {
  todoClicked: Todo | undefined;
};

const TodoItem = ({ todoClicked }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {todoClicked?.text}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {todoClicked?.category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TodoItem;
