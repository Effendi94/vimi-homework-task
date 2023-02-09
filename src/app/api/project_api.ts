import axios from "axios";
import { DefaultParams } from "../type/default_params";
import {  IProjectList } from "../type/project_prop";

const getProject =async ({page, limit, sort, archived, order, qName, status, type  } : DefaultParams): Promise<IProjectList>=>{
  const params = Object.assign(
    {'_page': page},
    {'_limit': limit},
    {'_sort': sort},
    {'_order': order},
    {'archived': archived},
    status?.trim() !== '' && {'status_like': status?.toUpperCase()},
    qName?.trim() !== '' && {'name_like': qName},
    type?.trim() !== '' && {'type_like': type},
    {'Access-Control-Expose-Headers': 'x-total-count'},
  )
  try {
    const res = await axios.get('http://localhost:3031/project', {params});
    const data:IProjectList = {
      projects: res.data,
      total: res.headers['x-total-count'] ?? 0,
    };
    return data;
  } catch (err) {
    throw new Error('Unexpected error!');
  }
}


const ProjectApi = {
  getProject:getProject,
}

export default ProjectApi;