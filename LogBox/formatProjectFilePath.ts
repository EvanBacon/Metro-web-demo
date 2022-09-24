export function formatProjectFileName(file?: string): string {
  if (file == null) {
    return "<unknown>";
  }
  const projectRoot = process.env.EXPO_PROJECT_ROOT;
  return pathRelativeToPath(
    file.replace(/\\/g, "/"),
    projectRoot.replace(/\\/g, "/")
  ).replace(/\?.*$/, "");
}

function pathRelativeToPath(path: string, relativeTo: string, sep = "/") {
  const relativeToParts = relativeTo.split(sep);
  const pathParts = path.split(sep);
  let i = 0;
  while (i < relativeToParts.length && i < pathParts.length) {
    if (relativeToParts[i] !== pathParts[i]) {
      break;
    }
    i++;
  }
  return pathParts.slice(i).join(sep);
}
