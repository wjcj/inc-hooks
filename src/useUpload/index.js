import { useCallback, useMemo } from 'react';
import { message, Upload } from 'antd';

const validateFileSize = (file, width, height) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      let err = null;
      if (width && img.width !== width) {
        err = `图片${file.name}宽度需为${width}px`;
      }
      if (height && img.height !== height) {
        err = `图片${file.name}高度需为${height}px`;
      }
      err ? reject(new Error(err)) : resolve(file);
    };
    img.onerror = function () {
      reject(new Error('图片尺寸校验失败'));
    };
    img.src = (window.URL || window.webkitURL).createObjectURL(file);
  });
};

// const acceptMap = {
//   // todo
//   'image/*': 'image/*',
// };
// const getAccept = (accept) => {
//   if (typeof accept === 'string') {
//     return accept;
//   }
//   if (Array.isArray(accept) && accept.length) {
//     return accept.map((fileType) => acceptMap(fileType) || fileType).join(',');
//   }
//   return undefined;
// };

const useUpload = (config) => {
  const {
    size, // kb
    width, // px
    height, // px
    fileTypes = [],
    ignoreErrorFile = false,
    ...uploadOptions
  } = config || {};

  const uploadProps = uploadOptions || {};

  const isRequired =
    size || width || height || (Array.isArray(fileTypes) && fileTypes.length);
  const beforeUpload = useMemo(() => {
    if (isRequired) {
      return (file, fileList) => {
        let error = '';
        if (Array.isArray(fileTypes) && fileTypes.length) {
          const isVaild = fileTypes.includes(file.type);
          if (!isVaild) {
            error = `无效的文件格式：${file.type}`;
          }
        }
        if (size && file.size / 1024 > size) {
          error = `文件大小需<= ${size}KB！`;
        }
        if (error) {
          message.error(error);
          return ignoreErrorFile ? Upload.LIST_IGNORE : Promise.reject(error);
        } else if (width || height) {
          return validateFileSize(file, width, height).catch((err) => {
            message.error(err.message);
            return ignoreErrorFile ? Upload.LIST_IGNORE : Promise.reject(err);
          });
        } else {
          return true;
        }
      };
    }
    return null;
  }, [isRequired, size, width, height, fileTypes, ignoreErrorFile]);

  if (isRequired) {
    uploadProps.beforeUpload = beforeUpload;
  }

  const getValueFromEvent = useCallback((e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }, []);
  return {
    uploadProps,
    getValueFromEvent,
  };
};

export default useUpload;
