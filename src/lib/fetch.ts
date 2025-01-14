class ApiFetch {
  baseUrl: string = "http://localhost:3000/";

  async get(dataUrl: string) {
    const response = await fetch(this.baseUrl + dataUrl);
    return response.json();
  }
}

const apiFetch = new ApiFetch();
export default apiFetch;
