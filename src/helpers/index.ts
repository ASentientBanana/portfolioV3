import { httpInstance } from "@/main";

export const getResume = async () => {
    try {
      const response = await httpInstance.get("resume", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Petar_Kocic_Resume.pdf";
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

