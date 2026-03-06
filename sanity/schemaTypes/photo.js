import {CameraModelInput, ShootingDateInput} from '../components/autoMetadataFields'

export default {
  name: 'photo',
  title: '照片作品',
  type: 'document',
  fields: [
    { name: 'title', title: '标题', type: 'string' },
    {
      name: 'image',
      title: '上传图片',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['exif', 'location', 'palette'],
      },
    },
    {
      name: 'locationTag',
      title: '地理标签',
      type: 'string',
      description: '如：西藏、冰岛',
    },
    {
      name: 'theme',
      title: '主题',
      type: 'string',
      description: '如：建筑、街拍、风景',
    },
    {
      name: 'cameraModel',
      title: '相机型号',
      type: 'string',
      components: {
        input: CameraModelInput,
      },
    },
    {
      name: 'shootingDate',
      title: '拍摄日期',
      type: 'date',
      components: {
        input: ShootingDateInput,
      },
    },
  ],
}
