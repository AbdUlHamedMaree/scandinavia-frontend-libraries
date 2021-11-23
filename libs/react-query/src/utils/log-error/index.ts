export const logError = (title: string, body: string) =>
  console.error(`%c [react-query]: Error in request, ${title}: %c ${body}`, 'color: #c0392b', 'color: #2980b9');
