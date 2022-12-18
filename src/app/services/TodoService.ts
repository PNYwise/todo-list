import Todo from "../models/Todo";
export const get = async (param: number): Promise<Todo[]> => {
     let todo = []
     if (!Number.isNaN(param)) {
          todo = await Todo.findAll({
               where: { activity_group_id: `${param}` }
          })
     } else {
          todo = await Todo.findAll()
     }
     if (todo.length > 0) {
          return todo.map<Todo>(($v): Todo => {
               $v.activity_group_id = $v.activity_group_id.toString()
               if ($v.is_active == true) {
                    $v.is_active = "1"
               } else {
                    $v.is_active = "0"
               }
               return $v
          })
     }
     return todo
}

export const getById = async (id: number): Promise<object | null> => {
     const todo: Todo | null = await Todo.findByPk(id)
     if (todo != null) {
          const { created_at, updated_at, deleted_at, id, title, activity_group_id, is_active, priority } = todo
          const newTodo = {
               id,
               title,
               activity_group_id: activity_group_id.toString(),
               is_active: (is_active) ? "1" : "0",
               priority,
               created_at,
               updated_at,
               deleted_at
          }
          return newTodo
     }
     return null

}
export const create = async (data: object): Promise<Object> => {
     const todo = await Todo.create(data);
     const { created_at, updated_at, id, title, activity_group_id, is_active, priority } = todo
     const newTodo = {
          created_at,
          updated_at,
          id,
          title,
          activity_group_id,
          is_active,
          priority
     }
     return newTodo
}

export const update = async (id: number, data: object): Promise<object | null> => {
     const todo: Todo | null = await Todo.findByPk(id)
     if (todo == null) {
          return null
     }
     todo.update(data)
     const { created_at, updated_at, deleted_at, title, activity_group_id, is_active, priority } = todo
     const newTodo = {
          id,
          title,
          activity_group_id: activity_group_id.toString(),
          is_active: (is_active) ? "1" : "0",
          priority,
          created_at,
          updated_at,
          deleted_at
     }
     return newTodo

}

export const destroy = async (id: number): Promise<boolean | null> => {
     const todo: Todo | null = await Todo.findByPk(id)
     if (todo == null) {
          return null
     }
     todo.destroy()
     return true

}