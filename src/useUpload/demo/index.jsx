import React, { useCallback } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useUpload } from 'inc-hooks';

const Index = () => {
  const { uploadProps } = useUpload({
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
  });
  const onChange = useCallback((info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }, []);

  return (
    <div>
      <Upload {...uploadProps} listType="text" onChange={onChange}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <hr />
      <Upload {...uploadProps} listType="picture" multiple onChange={onChange}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <hr />
      <Upload
        {...uploadProps}
        listType="picture-card"
        multiple
        onChange={onChange}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </div>
  );
};

export default Index;
