import {
  CACHE_REQUEST,
  CACHE_RESPONSE_PREFIX,
  CacheRequestPayload,
  CacheResponsePayload,
  Product,
} from '@groupby/elements-events';

/**
 * A string intended to be used as the name of the return event in
 * cache requests for this component.
 */
export function getResponseEventName(componentName, componentId): string {
  return `${CACHE_RESPONSE_PREFIX}${componentName}-${componentId}`;
}

/**
 * Requests initial data for the product components.
 */
export function requestCacheData(responseName, group, componentId): CacheRequestPayload {
  const cacheResponseEventName = this.getResponseEventName(componentId)
  const payload: CacheRequestPayload = {
    name: responseName,
    group: this.group,
    returnEvent: cacheResponseEventName,
  };
  return payload;
}
