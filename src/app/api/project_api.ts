import axios from "axios";
import { DefaultParams } from "../type/default_params";
import {  IProjectList } from "../type/project_prop";

const getProject =async ({page, limit, sort, archived, order, qName  } : DefaultParams): Promise<IProjectList>=>{
  const params = {
    '_page': page,
    '_limit': limit,
    '_sort': sort,
    '_order': order,
    'archived': archived,
    'name_like': qName,
    'Access-Control-Expose-Headers': 'x-total-count',
  }
  try {
    
    const res = await axios.get('http://localhost:3031/project', {params});
    const data:IProjectList = {
      projects: res.data,
      total: res.headers['x-total-count'] ?? 0,
    };
    return data;
   
  } catch (err) {
    throw new Error('Unexpected error');
  }
}


const ProjectApi = {
  getProject:getProject,
}

export default ProjectApi;