import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ClipboardList, Package, 
  FileText, History, Trash2, Sparkles, Download, X, Eye,
  Clock, Settings, Info, Save, ChevronDown
} from 'lucide-react';
import axios from 'axios';

// 🏗️ Import Design & Common UI
import tokens from './design/tokens';
import { Badge, Button } from './components/ui/Common';
import { Sidebar, Header } from './components/layout/Layout';
import { TaskListItem } from './components/TaskList/TaskListItem';

// 💡 Import High-Fidelity Lighting Components
import { TaskHeaderCard, FormCard } from './components/lighting/LightingComponents';
import { AutomationGrid } from './components/lighting/AutomationGrid';

// 📋 Import Lighting Form Content
import { 
  TaskBasicInfo, 
  TaskTimeline, 
  TaskTechnicalInfo 
} from './components/form/TaskFormSections';

const API_BASE = 'http://localhost:5000/api';

function App() {
  // Data Management
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks');

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      setTasks(res.data);
      if (res.data.length > 0 && !currentTask) setCurrentTask(res.data[0]);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  const handleSaveTask = async (taskToSave) => {
    try {
      if (taskToSave.id) await axios.put(`${API_BASE}/tasks/${taskToSave.id}`, taskToSave);
      else await axios.post(`${API_BASE}/tasks`, taskToSave);
      fetchTasks();
      setShowAddModal(false);
    } catch (err) { alert("Lỗi khi lưu công việc"); }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) return;
    try {
      await axios.delete(`${API_BASE}/tasks/${id}`);
      fetchTasks();
      if (currentTask?.id === id) setCurrentTask(null);
    } catch (err) { console.error("Delete Error:", err); }
  };

  const handleAISuggest = async () => {
    if (!currentTask) return;
    setIsLoadingAI(true);
    try {
      const res = await axios.post(`${API_BASE}/ai/suggest-standards-lighting`, { 
        taskName: currentTask.name 
      });
      setCurrentTask({ ...currentTask, standards: res.data.standards });
    } catch (err) { console.error("AI Error:", err); } 
    finally { setIsLoadingAI(false); }
  };

  const handleExport = async () => {
    if (!currentTask) return;
    try {
      const response = await axios.post(`${API_BASE}/export/docx`, currentTask, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `HoSo_ChieuSang_${currentTask.id}.docx`);
      document.body.appendChild(link);
      link.click();
    } catch (err) { alert("Lỗi xuất file hồ sơ"); }
  };

  const filteredTasks = tasks.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: <LayoutDashboard size={18}/> },
    { id: 'tasks', label: 'Công trình', icon: <ClipboardList size={18}/> },
    { id: 'materials', label: 'Vật liệu', icon: <Package size={18}/> },
    { id: 'templates', label: 'Mẫu hồ sơ', icon: <FileText size={18}/> },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-100 font-serif overflow-hidden">
      {/* 📌 ZONE 1: SIDEBAR */}
      <Sidebar 
        navItems={navItems} 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        projectInfo="Dự án Chiếu sáng TP.HCM - Gói 2026" 
      />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* 📌 ZONE 2-3 HEADER AREA */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/20 backdrop-blur-md shrink-0">
           <div className="flex items-center gap-4 bg-white/80 rounded-2xl px-6 py-2.5 w-1/2 border border-slate-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
              <span className="text-slate-400">/</span>
              <input 
                type="text" 
                placeholder="Tìm công tác điện chiếu sáng..." 
                className="bg-transparent border-none outline-none text-xs w-full font-bold text-slate-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <Button variant="action" size="md" onClick={() => setShowAddModal(true)} icon={X}>THÊM MỚI</Button>
        </header>

        <div className="flex-1 flex gap-6 min-h-0 overflow-hidden p-6 pt-0">
          
          {/* 📌 ZONE 2: TASK LIST (320px) */}
          <section className="w-80 flex flex-col shrink-0 overflow-hidden bg-white/40 rounded-[2rem] border border-white/60 shadow-sm">
            <div className="p-6 flex justify-between items-center bg-white/40 border-b border-slate-100">
               <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <ClipboardList size={14} className="text-indigo-500" /> Danh sách công tác
               </h2>
               <Badge variant="primary">{filteredTasks.length}</Badge>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
              {filteredTasks.map(task => (
                <TaskListItem 
                  key={task.id} 
                  task={task} 
                  isActive={currentTask?.id === task.id}
                  onClick={() => setCurrentTask(task)}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </section>

          {/* 📌 ZONE 3: DETAIL PANE (Primary Workspace - CARD BASED) */}
          <section className="flex-1 overflow-y-auto custom-scrollbar flex flex-col min-w-0 pr-2 pb-24">
            {!currentTask ? (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30 gap-4">
                <Settings size={64} className="animate-spin-slow" />
                <p className="font-black text-xs uppercase tracking-[0.3em]">Chọn một công tác chiếu sáng để quản lý</p>
              </div>
            ) : (
              <div className="animate-slide-in">
                {/* CARD 1: Task Header */}
                <TaskHeaderCard 
                  task={currentTask} 
                  onExport={handleExport}
                  onSave={() => handleSaveTask(currentTask)}
                  onDelete={() => handleDeleteTask(currentTask.id)}
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                  {/* CARD 2: Basic Info */}
                  <FormCard title="Thông tin cơ bản" icon={Info}>
                    <TaskBasicInfo task={currentTask} onChange={setCurrentTask} />
                  </FormCard>

                  {/* CARD 3: Timeline */}
                  <FormCard title="Lộ trình thời gian" icon={Clock}>
                    <TaskTimeline task={currentTask} onChange={setCurrentTask} />
                  </FormCard>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* CARD 4: Technical Info (Span 1) */}
                  <FormCard title="Kỹ thuật & Tiêu chuẩn" icon={Zap} className="xl:col-span-1 h-fit">
                    <TaskTechnicalInfo 
                      task={currentTask} 
                      onChange={setCurrentTask} 
                      onAISuggest={handleAISuggest}
                      isLoadingAI={isLoadingAI}
                    />
                  </FormCard>

                  {/* CARD 5: Automation (Span 2) */}
                  <div className="xl:col-span-2">
                    <AutomationGrid 
                      task={currentTask} 
                      onExportAll={handleExport}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* 📌 STICKY FOOTER ACTION BAR */}
      {currentTask && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-fit bg-slate-900/90 backdrop-blur-xl px-10 py-5 rounded-[2rem] border border-white/10 shadow-2xl z-50 flex items-center gap-8 animate-fade-in">
           <div className="flex flex-col">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Trình quản lý dự án Điện</p>
              <p className="text-xs text-white font-bold italic opacity-75">Hồ sơ đã sẵn sàng để nghiệm thu thực địa.</p>
           </div>
           <div className="w-[1px] h-8 bg-white/10"></div>
           <div className="flex gap-4">
              <button 
                onClick={() => handleSaveTask(currentTask)}
                className="flex items-center gap-2 px-6 py-2 border border-white/20 text-white rounded-full text-[10px] font-black uppercase hover:bg-white/10 transition-all"
              >
                <Save size={14} /> Lưu tạm
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 shadow-lg active:scale-95"
              >
                <Download size={14} /> Xuất hồ sơ nghiệm thu
              </button>
           </div>
        </div>
      )}

      {/* Modal for New Task */}
      {showAddModal && (
         <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl animate-fade-in relative">
               <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600">
                  <X size={24} />
               </button>
               <h3 className="text-2xl font-black text-slate-800 mb-2">Khởi tạo công tác điện</h3>
               <p className="text-xs text-slate-400 font-bold mb-8 uppercase tracking-widest">Dự án chiếu sáng công cộng 2026</p>
               
               <div className="space-y-6 mb-10">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên công tác</label>
                     <input 
                       className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                       placeholder="Vd: Lắp đặt trụ đèn cao áp..." 
                       value={newTask.name}
                       onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     {/* Category & Location selectors here */}
                  </div>
               </div>
               
               <button 
                  onClick={() => handleSaveTask(newTask)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
               >
                  Bắt đầu lập hồ sơ
               </button>
            </div>
         </div>
      )}
    </div>
  );
}

export default App;
