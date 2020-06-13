export const getCDNUrl = (name, version, file = '') => `https://cdn.jsdelivr.net/npm/${name}@${version}/${file}`;

export function parsePackageName(packageName) {
  let temp = packageName;
  let namespaced = false;
  if (packageName[0] === '@') {
    temp = temp.substr(1);
    namespaced = true;
  }
  const [name, version] = temp.split('@');
  return {
    name: namespaced ? `@${name}` : name,
    version,
  };
}
