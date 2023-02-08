export interface IProject {
  id: string,
  name: string,
  status: string,
  type: string,
  createdOn: string,
  archieved: boolean,
}

export interface IProjectList {
  projects: IProject[],
  total: number,
}

