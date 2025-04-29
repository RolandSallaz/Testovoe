export interface IFetch {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: BodyInit | Record<string, unknown>;
}

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

const apiUrl = 'http://localhost:3000'

function checkResponse<T>(res: Response): Promise<T> {
  return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
}

function _fetch<T>({ url, method = "GET", headers, body }: IFetch): Promise<T> {
  let contentTypeHeader: string | undefined = undefined;
  let authorization = "";
  if (typeof window !== "undefined") {
    authorization = localStorage.getItem("jwt") || "";
  }

  if (body instanceof FormData) {

  } else if (body) {
    contentTypeHeader = "application/json";
  }


  const mergedHeaders = {
    authorization,
    ...(contentTypeHeader ? { "Content-Type": contentTypeHeader } : {}),
    ...headers,
  };

  const requestBody: BodyInit =
    body instanceof FormData ? body : JSON.stringify(body);

  return fetch(`${apiUrl}/${url}`, {
    method,
    headers: mergedHeaders,
    body: requestBody,
  }).then(checkResponse<T>);
}


export function apiGetTasks(): Promise<ITask[]> {
  return _fetch({ url: 'tasks' })
}

export function apiPostTask(title: string): Promise<ITask> {
  return _fetch({ url: 'tasks', method: 'POST', body: { title } })
}

export function apiUpdateTask(id: number, completed: boolean): Promise<ITask> {
  return _fetch({ url: `tasks/${id}`, method: 'PATCH', body: { completed } })
}