import { CACHE_RESPONSE_PREFIX, CacheRequestPayload } from '@groupby/elements-events';

/**
 * A string intended to be used as the name of the return event in
 * cache requests for the product components.
 */
export function getResponseEventName(componentName: string, componentId: any): string {
  return `${CACHE_RESPONSE_PREFIX}${componentName}-${componentId}`;
}

/**
 * Requests initial data for the product components.
 */
// export const requestCacheData = (responseName: string, group: string, cacheResponseEventName: string): CacheRequestPayload => {
//   console.log('in requestCacheData - responseName:', responseName, 'group:', group, 'componentId', componentId, 'componentName', componentName);
//   const payload: CacheRequestPayload = {
//     name: responseName,
//     group,
//     returnEvent: cacheResponseEventName,
//   };
//   return payload;
// };
