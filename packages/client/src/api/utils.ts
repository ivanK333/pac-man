export const camelToSnake = (obj: Record<string, any>): Record<string, any> => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelToSnake(item));
  }

  const snakeCaseObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeCaseKey = key.replace(/[A-Z]/g, (letter) => {
        return '_' + letter.toLowerCase();
      });
      snakeCaseObj[snakeCaseKey] = camelToSnake(obj[key]);
    }
  }

  return snakeCaseObj;
};

export const snakeToCamel = (obj: Record<string, any>): Record<string, any> => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => snakeToCamel(item));
  }

  const camelCaseObj: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_(\w)/g, (_, letter) => {
        return letter.toUpperCase();
      });
      camelCaseObj[camelCaseKey] = snakeToCamel(obj[key]);
    }
  }

  return camelCaseObj;
};
