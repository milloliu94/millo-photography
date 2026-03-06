import { motion, AnimatePresence } from 'framer-motion';

// 1. 定义 image 的“说明书”，消除 any 类型的报错
interface PhotoData {
  url: string;
  title: string;
  locationTag?: string;
  shootingDate?: string;
  metadata?: {
    exif?: {
      Model?: string;
    };
  };
}

// 2. 在这里指定参数类型
export default function Lightbox({ 
  image, 
  onClose 
}: { 
  image: PhotoData | null; 
  onClose: () => void; 
}) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-10"
      >
        {/* 关闭按钮 */}
        <button 
          onClick={onClose} 
          className="absolute top-10 right-10 text-3xl font-light hover:rotate-90 transition-transform duration-300"
        >
          ✕
        </button>
        
        <div className="flex w-full max-w-7xl h-[80vh] gap-12">
          {/* 左侧大图：保持比例居中 */}
          <div className="flex-[2] flex items-center justify-center bg-gray-50/50">
            <img 
              src={image.url} 
              alt={image.title} 
              className="max-w-full max-h-full object-contain shadow-2xl" 
            />
          </div>
          
          {/* 右侧信息栏：参考图3的极简排版 */}
          <div className="flex-1 flex flex-col justify-center border-l border-gray-100 pl-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-2">{image.title}</h2>
            <div className="w-10 h-[1px] bg-black mb-8"></div>
            
            <div className="space-y-6 text-xs tracking-widest text-gray-400 uppercase">
              <div>
                <p className="mb-1 text-gray-300">LOCATION</p>
                <p className="text-gray-800 text-sm font-medium">{image.locationTag || 'Unknown'}</p>
              </div>
              <div>
                <p className="mb-1 text-gray-300">EQUIPMENT</p>
                <p className="text-gray-800 text-sm font-medium">{image.metadata?.exif?.Model || 'Unknown Device'}</p>
              </div>
              <div>
                <p className="mb-1 text-gray-300">CAPTURED ON</p>
                <p className="text-gray-800 text-sm font-medium">{image.shootingDate || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}



