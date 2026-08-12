import React from "react";

export class Helper {
  static isHaveCategory = (cates = [], cate) => {
    const isHave = cates?.find((item) => {
      return item?.material?.name === cate;
    });
    return isHave ? true : false;
  };

  static isWallpaperTypeMural = (type) => {
    return String(type) == "mural";
  };
  static getApiCheckboxSelectedValue = (value) => {
    if (["YES", "yes", "Yes", true, "true"].includes(value)) {
      return true;
    }
    return false;
  };
  static getTrackNameWithLength = ({ name, length }) => {
    return `${name} (Track length - ${length})`;
  };
}
