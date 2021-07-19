import React from 'react';
import { Upload, Button, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useUpload } from 'inc-hooks';

const Index = () => {
  const { uploadProps: uploadProps1 } = useUpload({
    width: 200,
    height: 100,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  });

  const { uploadProps: uploadProps2 } = useUpload({
    width: 200,
    height: 100,
    size: 1024,
    fileTypes: ['image/png'],
    ignoreErrorFile: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  });

  return (
    <div>
      <Upload {...uploadProps1}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Divider orientation="left">
        校验失败不仅拦截上传行为，并阻止文件进入上传列表
      </Divider>
      <Upload {...uploadProps2}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default Index;
