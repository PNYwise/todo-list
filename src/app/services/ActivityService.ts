import Activity from "../models/Activity";
export const get = async (param: number | null = null): Promise<Activity[] | boolean> => {
     let activity = await Activity.findAll()
     if (param != null) {
          activity = await Activity.findAll({
               where: { id: `${param}` }
          })
     }
     console.log(activity)
     if (activity.length >= 1) {
          return activity
     }
     return false
}

export const getById = async (id: number): Promise<Activity | null> => {
     const activity: Activity | null = await Activity.findByPk(id)
     if (activity == null) {
          return null
     }
     return activity

}
export const create = async (data: object): Promise<Object> => {
     const activity = await Activity.create(data);
     const { created_at, updated_at, id, title, email } = activity
     const newActivity = {
          created_at,
          updated_at,
          id,
          title,
          email
     }
     return newActivity
}

export const update = async (id: number, data: object): Promise<Activity | null> => {
     const activity: Activity | null = await Activity.findByPk(id)
     if (activity == null) {
          return null
     }
     activity.update(data)
     return activity

}

export const destroy = async (id: number): Promise<boolean | null> => {
     const activity: Activity | null = await Activity.findByPk(id)
     if (activity == null) {
          return null
     }
     activity.destroy()
     return true

}