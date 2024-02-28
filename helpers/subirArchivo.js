import path from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif", "webp"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { img } = files;

    let nombresArr = [];

    if (img.length !== undefined) {
      img.forEach((e) => {
        const nombreCortado = e.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar la extensión
        if (!extensionesValidas.includes(extension)) {
          return reject("La extensión no es permitida");
        }

        const nombreTemp = v4() + "." + extension;

        const uploadPath = path.join(
          __dirname,
          "../uploads/",
          carpeta,
          nombreTemp
        );

        e.mv(uploadPath, (err) => {
          if (err) {
            console.log(err);
            reject(err);
          }

          nombresArr = [...nombresArr, nombreTemp];
        });
      });
    } else {
      const nombreCortado = img.name.split(".");
      const extension = nombreCortado[nombreCortado.length - 1];

      //Validar la extensión
      if (!extensionesValidas.includes(extension)) {
        return reject("La extensión no es permitida");
      }

      const nombreTemp = v4() + "." + extension;

      const uploadPath = path.join(
        __dirname,
        "../uploads/",
        carpeta,
        nombreTemp
      );

      img.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        nombresArr = [...nombresArr, nombreTemp];
      });
    }

    setTimeout(() => {
      resolve(nombresArr);
    }, 100);
  });
};
