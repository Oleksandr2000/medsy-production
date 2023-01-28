const { GoogleSpreadsheet } = require("google-spreadsheet");
import { IPersonalData } from "contexts/admin/admin.provider";
import JSXStyle from "styled-jsx/style";
import { parseString } from "./parse-string";

export async function getDataSheet(personalData: IPersonalData) {
  if (
    !(
      personalData.googleEmail &&
      personalData.googleTableId &&
      personalData.googleKey
    )
  ) {
    throw new Error("GOOGLE credentials must be set");
  }
  const doc = new GoogleSpreadsheet(personalData.googleTableId);
  await doc.useServiceAccountAuth({
    client_email: personalData.googleEmail,
    private_key: personalData.googleKey.replace(/\\n/gm, "\n"),
  });
  await doc.loadInfo();
  const category_sheet = doc.sheetsByTitle['category'];
  const products_sheet = doc.sheetsByTitle['products'];
  const localization_sheet = doc.sheetsByTitle['localization'];

  const category_rows = await category_sheet.getRows();
  const products_rows = await products_sheet.getRows();
  const localization_rows = await localization_sheet.getRows();

  const categories = category_rows?.map(
    ({ _sheet, _rowNumber, _rawData, ...fields }) => ({
      ...fields,
    })
  )

  const products = products_rows?.map(
    ({ _sheet, _rowNumber, _rawData, ...fields }) => ({
      ...fields,
    })
  );

  const localization = localization_rows?.map(
      ({ _sheet, _rowNumber, _rawData, ...fields }) => ({
        ...fields,
      })
  );

  const parsedProducts = products.map(item => {
    return {
      ...item,
      image: item.image.split(","),
      params: parseString(item.params),
    }
  })


  return {
    products: JSON.parse(JSON.stringify(parsedProducts)),
    categories: JSON.parse(JSON.stringify(categories)),
    localization: JSON.parse(JSON.stringify(localization)),
  }
}
