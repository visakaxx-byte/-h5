/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Bell, 
  ChevronRight, 
  Wrench, 
  Shirt, 
  Activity, 
  ShoppingBag, 
  Camera, 
  Plus,
  Home, 
  MessageCircle, 
  ClipboardList, 
  User
} from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const GeneratedIcon = ({ prompt, alt }: { prompt: string, alt: string }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const generate = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }]
          }
        });
        
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (e) {
        console.error("Failed to generate icon", e);
      }
    };
    generate();
  }, [prompt]);

  if (!imageUrl) return <div className="w-full h-full bg-white/20 animate-pulse rounded-full" />;

  return <img src={imageUrl} alt={alt} className="w-full h-full object-contain" referrerPolicy="no-referrer" />;
};

const ServiceIcon = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
      <Icon size={20} />
    </div>
    <span className="text-[10px] text-gray-600 font-medium">{label}</span>
  </div>
);

const ExploreCard = ({ title, subtitle, imageUrl }: { title: string, subtitle: string, imageUrl: string }) => (
  <div className="mb-6">
    <div className="bg-gradient-to-br from-[#F0F7FF] to-[#E6F0FF] p-4 rounded-[28px] border border-white/50 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-[10px] text-gray-400">{subtitle}</p>
        </div>
        <button className="flex items-center gap-1 text-[9px] bg-black text-white px-2 py-1 rounded-full font-bold">
          全部活动 <ChevronRight size={10} />
        </button>
      </div>
      <div className="relative rounded-2xl overflow-hidden aspect-[21/9]">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ imageUrl, avatarUrl, name, content }: { imageUrl: string, avatarUrl: string, name: string, content: string }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <div className="aspect-[3/4] relative">
      <img src={imageUrl} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
    <div className="p-3">
      <div className="flex items-center gap-2 mb-2">
        <img src={avatarUrl} alt={name} className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
        <span className="text-[9px] text-gray-500 font-medium">{name}</span>
      </div>
      <p className="text-[10px] text-gray-800 line-clamp-2 leading-relaxed">
        {content}
      </p>
    </div>
  </div>
);

const MainContent = () => (
  <div className="h-full bg-[#F7F8FA] overflow-y-auto scrollbar-hide">
    {/* Hero Section */}
    <div className="relative h-[520px] w-full">
      {/* Background Image Container (Full Width) */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=1200" 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom Gradient to blend with background */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#F7F8FA] via-[#F7F8FA]/80 to-transparent" />
      </div>
      
      {/* Main Banner Card (Centered as per image) */}
      <div className="absolute inset-x-0 top-14 flex justify-center px-6 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] shadow-2xl overflow-hidden w-full max-w-[340px] flex flex-col"
        >
          <div className="relative h-[420px]">
            <img 
              src="https://images.unsplash.com/photo-1517176118179-65244903d13c?auto=format&fit=crop&q=80&w=600" 
              alt="Skiing" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Text Overlay on Card - Aligned with reference */}
            <div className="absolute inset-0 flex flex-col items-center pt-10 text-white">
              <h1 className="text-[44px] font-[900] tracking-tighter mb-1 drop-shadow-xl italic">新疆滑雪营</h1>
              <p className="text-sm font-bold opacity-90 mb-6 tracking-wide">现在报名 送滑雪礼包6件套</p>
              
              <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg scale-110">
                <span className="text-xs font-black bg-black text-white px-2 py-0.5 rounded italic">一价全包</span>
                <span className="text-2xl font-black text-[#FF4D00] italic">3500</span>
                <span className="text-[10px] text-black/60 font-bold">起</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    <div className="px-4 -mt-20 relative z-40 pb-20">
      {/* Notification Bar */}
      <div 
        className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm mb-4"
        style={{ marginLeft: '0px', marginTop: '60px' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
            <Bell size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">温馨提醒</h4>
            <p className="text-[10px] text-gray-400">您有1条待上课提醒</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-gray-300" />
      </div>

      {/* Main Navigation Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-8">
        <div className="col-span-1 row-span-2 bg-[#E6F0FF] rounded-3xl p-4 relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          <div className="absolute top-0 right-0 bg-[#FF5C5C] text-white text-[9px] px-2 py-0.5 rounded-bl-xl font-bold">
            618早鸟活动
          </div>
          <div>
            <h3 className="text-base font-black text-gray-900 leading-tight">滑雪训练营/教学</h3>
            <p className="text-[9px] text-gray-500 mt-1">报名即送滑雪大礼包</p>
          </div>
          <div className="mt-auto">
            <img 
              src="https://images.unsplash.com/photo-1551524164-687a55ea1110?auto=format&fit=crop&q=80&w=400" 
              alt="Skiing" 
              className="w-full h-24 object-cover rounded-2xl mb-2"
              referrerPolicy="no-referrer"
            />
            <button className="w-full bg-[#B8E5E5] text-gray-900 py-1.5 rounded-xl font-black text-xs italic">
              GO报名
            </button>
          </div>
        </div>

        <div className="bg-[#F0F4F8] rounded-3xl p-3 flex flex-col justify-between relative overflow-hidden h-[95px]">
          <div>
            <h3 className="text-xs font-black text-gray-900">约搭子</h3>
            <p className="text-[9px] text-gray-400">寻找滑雪小伙伴</p>
          </div>
          <div className="flex justify-between items-end">
            <div className="bg-black text-white text-[8px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              GO <ChevronRight size={6} />
            </div>
            <div className="absolute -right-1 -bottom-1 w-10 h-10 opacity-80">
              <img src="https://api.iconify.design/noto:skier.svg" alt="icon" className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="bg-[#F0F4F8] rounded-3xl p-3 flex flex-col justify-between relative overflow-hidden h-[95px]">
          <div>
            <h3 className="text-xs font-black text-gray-900">约车/租车</h3>
            <p className="text-[9px] text-gray-400">出行接送 无忧体验</p>
          </div>
          <div className="flex justify-between items-end">
            <div className="bg-black text-white text-[8px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              GO <ChevronRight size={6} />
            </div>
            <div className="absolute -right-1 -bottom-1 w-10 h-10 opacity-90">
              <GeneratedIcon 
                prompt="A high-quality 3D isometric icon of a modern white SUV car with a ski rack on top, clean minimalist style, soft studio lighting, white background, 3D render." 
                alt="Car Icon" 
              />
            </div>
          </div>
        </div>

        <div className="bg-[#E6F4F4] rounded-3xl p-3 flex flex-col justify-between relative overflow-hidden h-[95px]">
          <div>
            <h3 className="text-xs font-black text-gray-900">雪具商城</h3>
            <p className="text-[9px] text-gray-400">线上线下均可购买</p>
          </div>
          <div className="flex justify-between items-end">
            <div className="bg-black text-white text-[8px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              GO <ChevronRight size={6} />
            </div>
            <div className="absolute -right-1 -bottom-1 w-10 h-10 opacity-80">
              <img src="https://api.iconify.design/noto:shopping-cart.svg" alt="icon" className="w-full h-full" />
            </div>
          </div>
        </div>

        <div className="bg-[#E6F4F4] rounded-3xl p-3 flex flex-col justify-between relative overflow-hidden h-[95px]">
          <div>
            <h3 className="text-xs font-black text-gray-900">雪具租赁</h3>
            <p className="text-[9px] text-gray-400">随租随用 畅滑无忧</p>
          </div>
          <div className="flex justify-between items-end">
            <div className="bg-black text-white text-[8px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              GO <ChevronRight size={6} />
            </div>
            <div className="absolute -right-1 -bottom-1 w-10 h-10 opacity-90">
              <GeneratedIcon 
                prompt="A high-quality 3D isometric icon of professional skis and a snowboard leaning against each other, vibrant colors, clean minimalist style, soft studio lighting, white background, 3D render." 
                alt="Snowboard Icon" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* More Services */}
      <div className="mb-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">更多服务</h2>
        <div className="flex justify-between px-1">
          <ServiceIcon icon={Wrench} label="雪具维护" />
          <ServiceIcon icon={Shirt} label="雪服清洗" />
          <ServiceIcon icon={Activity} label="理疗排酸" />
          <ServiceIcon icon={ShoppingBag} label="跑腿代购" />
          <ServiceIcon icon={Camera} label="摄影摄像" />
        </div>
      </div>

      {/* Explore More */}
      <div className="mb-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">探索更多</h2>
        <ExploreCard 
          title="滑遍全球" 
          subtitle="超多国外外滑雪活动等你来！" 
          imageUrl="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800&h=400"
        />
        <ExploreCard 
          title="国内滑雪" 
          subtitle="现在预定优惠更多！" 
          imageUrl="https://images.unsplash.com/photo-1517176642928-5803d488154e?auto=format&fit=crop&q=80&w=800&h=400"
        />
      </div>

      {/* Skiers Experience */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-black text-gray-900">雪友体验</h2>
          <div className="flex bg-gray-200 p-1 rounded-lg text-[9px] font-bold">
            <button className="bg-black text-white px-2.5 py-0.5 rounded-md">推荐</button>
            <button className="text-gray-500 px-2.5 py-0.5">全部</button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <ExperienceCard 
            imageUrl="https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=400&h=600"
            avatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
            name="Mingqi"
            content="既然已经不是前几年能在家里当大王的小孩了 那就出去滑雪过年吧！一个人旅游"
          />
          <ExperienceCard 
            imageUrl="https://images.unsplash.com/photo-1565992441121-428763bc87af?auto=format&fit=crop&q=80&w=400&h=600"
            avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
            name="Mingqi"
            content="既然已经不是前几年能在家里当大王的小孩了 那就出去滑雪过年吧！一个人旅游"
          />
        </div>
      </div>
    </div>

    {/* Bottom Navigation (Inside Frame) */}
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      <div className="flex flex-col items-center gap-1 text-black">
        <Home size={20} />
        <span className="text-[9px] font-bold">首页</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-400 relative">
        <MessageCircle size={20} />
        <span className="text-[9px] font-medium">消息</span>
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[7px] flex items-center justify-center rounded-full border-2 border-white">1</div>
      </div>
      <div className="bg-black w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg border-[3px] border-white">
        <Plus size={24} strokeWidth={3} />
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-400">
        <ClipboardList size={20} />
        <span className="text-[9px] font-medium">订单</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-400">
        <User size={20} />
        <span className="text-[9px] font-medium">我的</span>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 sm:p-10 overflow-hidden">
      {/* iPhone 15 Pro Frame Container */}
      <div className="relative w-[393px] h-[852px] max-w-full max-h-full">
        {/* Outer Frame */}
        <div className="absolute inset-0 bg-[#222] rounded-[55px] shadow-[0_0_0_4px_#333,0_0_0_6px_#1a1a1a,0_30px_60px_rgba(0,0,0,0.8)] border-[10px] border-black overflow-hidden">
          
          {/* Screen Content */}
          <div className="w-full h-full relative">
            <MainContent />
          </div>
        </div>

        {/* Physical Buttons (Decorative) */}
        <div className="absolute top-40 -left-1.5 w-1.5 h-12 bg-[#333] rounded-l-md" /> {/* Action Button */}
        <div className="absolute top-60 -left-1.5 w-1.5 h-24 bg-[#333] rounded-l-md" /> {/* Volume Up/Down */}
        <div className="absolute top-52 -right-1.5 w-1.5 h-24 bg-[#333] rounded-r-md" /> {/* Power Button */}
      </div>
    </div>
  );
}
