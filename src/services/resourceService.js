import { resources } from './dummyData';

export function getResources(type) {
  if (type) {
    return resources[type];
  } else {
    // Return all resources combined
    return Object.values(resources).flat();
  }
}

export function updateResourceStatus(type, id, status) {
  const resourceList = resources[type];
  const resource = resourceList.find((res) => res.id === id);
  if (resource) {
    resource.status = status;
  }
}
