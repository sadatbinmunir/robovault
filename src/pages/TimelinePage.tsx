import React, { useState } from 'react';
import { Clock, Plus, CheckCircle, Circle, Image as ImageIcon, Video, FileText, Code, ArrowRight, ExternalLink, Calendar, ChevronRight, X, Sparkles, Filter } from 'lucide-react';
import { TimelineWeek, MediaItem } from '../types';

interface TimelinePageProps {
  weeks: TimelineWeek[];
  onAddWeek: (newWeek: TimelineWeek) => void;
  onUpdateWeek: (updatedWeek: TimelineWeek) => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({
  weeks,
  onAddWeek,
  onUpdateWeek,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<TimelineWeek | null>(null);
  const [isAddingWeek, setIsAddingWeek] = useState(false);
  const [sortOrder, setSortOrder] = useState<'chronological' | 'reverse'>('reverse');

  // New week state for in-page modal
  const [newWeekData, setNewWeekData] = useState<Partial<TimelineWeek>>({
    weekNumber: weeks.length + 1,
    title: '',
    dateRange: `Week 0${weeks.length + 1} // Development Milestone`,
    status: 'completed',
    summary: '',
    fullContent: '',
    tags: ['Robotics', 'Lab Testing'],
    mediaItems: [],
    deliverables: [],
  });

  const [tempMediaTitle, setTempMediaTitle] = useState('');
  const [tempMediaUrl, setTempMediaUrl] = useState('');
  const [tempMediaCaption, setTempMediaCaption] = useState('');
  const [tempMediaType, setTempMediaType] = useState<'image' | 'video' | 'document' | 'code'>('image');
  const [tempDeliverable, setTempDeliverable] = useState('');

  const sortedWeeks = [...weeks].sort((a, b) => {
    return sortOrder === 'reverse'
      ? b.weekNumber - a.weekNumber
      : a.weekNumber - b.weekNumber;
  });

  const handleCreateWeek = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeekData.title || !newWeekData.summary) return;

    const created: TimelineWeek = {
      id: `week-${Date.now()}`,
      weekNumber: Number(newWeekData.weekNumber) || weeks.length + 1,
      title: newWeekData.title || `Week ${weeks.length + 1} Milestone`,
      dateRange: newWeekData.dateRange || `Week 0${weeks.length + 1}`,
      status: (newWeekData.status as any) || 'completed',
      summary: newWeekData.summary || '',
      fullContent: newWeekData.fullContent || newWeekData.summary || '',
      tags: newWeekData.tags || ['Update'],
      mediaItems: newWeekData.mediaItems || [],
      deliverables: newWeekData.deliverables || [
        { task: 'Milestone verified by team', completed: true },
      ],
    };

    onAddWeek(created);
    setIsAddingWeek(false);
    setSelectedWeek(created);
  };

  const handleAddMediaToNewWeek = () => {
    if (!tempMediaUrl) return;
    const item: MediaItem = {
      id: `m-${Date.now()}`,
      type: tempMediaType,
      title: tempMediaTitle || `${tempMediaType.toUpperCase()} Asset`,
      url: tempMediaUrl,
      caption: tempMediaCaption || 'Weekly test asset',
    };
    setNewWeekData({
      ...newWeekData,
      mediaItems: [...(newWeekData.mediaItems || []), item],
    });
    setTempMediaTitle('');
    setTempMediaUrl('');
    setTempMediaCaption('');
  };

  const handleAddDeliverable = () => {
    if (!tempDeliverable.trim()) return;
    setNewWeekData({
      ...newWeekData,
      deliverables: [
        ...(newWeekData.deliverables || []),
        { task: tempDeliverable.trim(), completed: true },
      ],
    });
    setTempDeliverable('');
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>CHRONOLOGICAL CAPSTONE ROADMAP</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-tech font-extrabold text-white tracking-tight">
          Weekly Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 neon-glow-text">Timeline</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          A step-by-step chronological log of our robotics coursework progression. Click on any week card below to inspect its full repository of photos, video tests, and laboratory notes.
        </p>

        {/* Action Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsAddingWeek(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW WEEK UPDATE</span>
          </button>

          <div className="flex items-center gap-1 p-1 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs font-mono">
            <button
              onClick={() => setSortOrder('reverse')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                sortOrder === 'reverse'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Newest First (Week {weeks.length} → 1)
            </button>
            <button
              onClick={() => setSortOrder('chronological')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                sortOrder === 'chronological'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Chronological (Week 1 → {weeks.length})
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Roadmap Container */}
      <div className="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-32 md:ml-40 space-y-12 pb-12">
        {sortedWeeks.map((week) => {
          const isCompleted = week.status === 'completed';
          const isInProgress = week.status === 'in-progress';

          return (
            <div key={week.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Node Marker on the Line */}
              <div
                className={`absolute -left-[17px] top-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-400 shadow-[0_0_15px_#00ff88]'
                    : isInProgress
                    ? 'bg-emerald-900 border-teal-300 text-teal-200 shadow-[0_0_20px_#10b981] animate-pulse'
                    : 'bg-black border-slate-700 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Circle className="w-3.5 h-3.5 fill-current" />
                )}
              </div>

              {/* Floating Date/Week Tag on the Left (for desktop) */}
              <div className="hidden sm:block absolute -left-36 top-5 w-28 text-right">
                <span className="font-tech text-base font-bold text-emerald-400 block">
                  WEEK {week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block line-clamp-1">
                  {week.dateRange.split('//')[1] || week.dateRange}
                </span>
              </div>

              {/* Main Week Card */}
              <div
                onClick={() => setSelectedWeek(week)}
                className="cursor-pointer p-6 sm:p-7 rounded-2xl glass-panel border border-emerald-500/25 hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 space-y-5"
              >
                {/* Header & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="sm:hidden text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                      WEEK {week.weekNumber}
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                          : isInProgress
                          ? 'bg-teal-950 text-teal-300 border-teal-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}
                    >
                      {week.status}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Click for Full Week Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Title & Text Post Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-tech font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {week.title}
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      Text Post
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-emerald-500/25 relative overflow-hidden group-hover:border-emerald-500/40 transition-colors">
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500" />
                    <p className="text-sm sm:text-base text-emerald-100 font-mono leading-relaxed pl-2">
                      {week.summary}
                    </p>
                  </div>
                </div>

                {/* Media Showcase Preview Bar */}
                {week.mediaItems && week.mediaItems.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    {week.mediaItems.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="relative rounded-xl overflow-hidden border border-emerald-500/20 bg-black/40 group/media h-36"
                      >
                        {item.type === 'video' ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/30 text-emerald-400 p-3 text-center">
                            <Video className="w-8 h-8 mb-1 group-hover/media:scale-110 transition-transform" />
                            <span className="text-xs font-mono font-medium line-clamp-1 text-slate-200">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-emerald-400/80 font-mono mt-1">
                              [Video Test Log]
                            </span>
                          </div>
                        ) : item.type === 'image' ? (
                          <div className="w-full h-full relative">
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                              <span className="text-[11px] font-mono text-emerald-300 line-clamp-1">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/20 text-emerald-300 p-3 text-center">
                            <FileText className="w-7 h-7 mb-1" />
                            <span className="text-xs font-mono line-clamp-1">{item.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono">[Doc/Snippet]</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Deliverables snippet */}
                {week.deliverables && week.deliverables.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {week.deliverables.map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded-md"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{d.task}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL PAGE MODAL FOR A CLICKED WEEK (As requested by user: "when clicked on a week it will shouw a full page of stuff i uploaded that week ok?") */}
      {selectedWeek && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#040e08] border border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(16,185,129,0.35)] space-y-8 max-h-[92vh] overflow-y-auto my-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-emerald-500/30 pb-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500 text-black text-xs font-tech font-bold">
                    WEEK {selectedWeek.weekNumber} ARCHIVE
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/30">
                    {selectedWeek.dateRange}
                  </span>
                  <span className="text-xs font-mono uppercase text-slate-400">
                    STATUS: {selectedWeek.status}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-tech font-bold text-white">
                  {selectedWeek.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedWeek(null)}
                className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:text-white hover:bg-emerald-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Full Content Prose */}
            <div className="space-y-4">
              <h4 className="text-sm font-tech font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>OFFICIAL WEEKLY POST</span>
              </h4>
              <div className="p-6 rounded-xl bg-black/60 border border-emerald-500/30 text-base sm:text-lg text-emerald-100 font-mono leading-relaxed whitespace-pre-line border-l-4 border-l-emerald-400 shadow-inner">
                {selectedWeek.fullContent || selectedWeek.summary}
              </div>
            </div>

            {/* Media Gallery: Photos, Videos, Code */}
            {selectedWeek.mediaItems && selectedWeek.mediaItems.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-tech font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>UPLOADED MEDIA & LAB TEST ARTIFACTS</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedWeek.mediaItems.map((media) => (
                    <div
                      key={media.id}
                      className="rounded-xl overflow-hidden border border-emerald-500/30 bg-black/60 p-4 space-y-3"
                    >
                      {media.type === 'image' && (
                        <div className="rounded-lg overflow-hidden h-56 bg-black flex items-center justify-center">
                          <img
                            src={media.url}
                            alt={media.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {media.type === 'video' && (
                        <div className="rounded-lg overflow-hidden h-56 bg-emerald-950/40 flex flex-col items-center justify-center border border-emerald-500/20 p-4 text-center">
                          <video
                            src={media.url}
                            controls
                            className="w-full h-full object-cover rounded"
                          >
                            Your browser does not support HTML video.
                          </video>
                        </div>
                      )}

                      {media.type === 'document' && (
                        <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
                          <FileText className="w-8 h-8 text-emerald-400 shrink-0" />
                          <div>
                            <p className="text-xs font-mono font-bold text-white">{media.title}</p>
                            <p className="text-[11px] text-slate-400">PDF / Lab Document Attachment</p>
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <h5 className="text-sm font-tech font-bold text-emerald-300">
                          {media.title}
                        </h5>
                        <p className="text-xs text-slate-300 leading-normal">
                          {media.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Checklist */}
            {selectedWeek.deliverables && (
              <div className="space-y-3">
                <h4 className="text-sm font-tech font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>COMPLETED DELIVERABLES & OUTCOMES</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedWeek.deliverables.map((d, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/25 flex items-center gap-2.5 text-xs text-slate-200 font-mono"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{d.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Learnings & Next Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {selectedWeek.keyLearnings && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                  <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">
                    Key Technical Learning
                  </span>
                  <p className="text-xs text-slate-300">
                    {selectedWeek.keyLearnings}
                  </p>
                </div>
              )}
              {selectedWeek.nextWeekGoals && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                  <span className="text-[11px] font-mono uppercase text-teal-400 font-bold">
                    Next Target Objectives
                  </span>
                  <p className="text-xs text-slate-300">
                    {selectedWeek.nextWeekGoals}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-emerald-500/30">
              <button
                onClick={() => setSelectedWeek(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                CLOSE WEEK VIEW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TO ADD A NEW WEEK UPDATE */}
      {isAddingWeek && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#051109] border border-emerald-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
              <h3 className="text-lg font-tech font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Post New Week Milestone</span>
              </h3>
              <button
                onClick={() => setIsAddingWeek(false)}
                className="text-slate-400 hover:text-white font-mono text-sm"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleCreateWeek} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Week Number</label>
                  <input
                    type="number"
                    value={newWeekData.weekNumber}
                    onChange={(e) => setNewWeekData({ ...newWeekData, weekNumber: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded bg-black/60 border border-emerald-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Status</label>
                  <select
                    value={newWeekData.status}
                    onChange={(e) => setNewWeekData({ ...newWeekData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded bg-black/60 border border-emerald-500/30 text-white"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Milestone Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Sensor Fusion Benchmark & Circuit Board Fabrication"
                  value={newWeekData.title}
                  onChange={(e) => setNewWeekData({ ...newWeekData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black/60 border border-emerald-500/30 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Brief Summary *</label>
                <input
                  type="text"
                  placeholder="1-2 sentences summarizing what was accomplished..."
                  value={newWeekData.summary}
                  onChange={(e) => setNewWeekData({ ...newWeekData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black/60 border border-emerald-500/30 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Full Detailed Notes / Post Body</label>
                <textarea
                  rows={4}
                  placeholder="Describe your week in detail: experiments, results, challenges, fixes..."
                  value={newWeekData.fullContent}
                  onChange={(e) => setNewWeekData({ ...newWeekData, fullContent: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-black/60 border border-emerald-500/30 text-white"
                />
              </div>

              {/* Add Media Section */}
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
                <span className="text-emerald-400 font-bold block">Attach Media (Photos / Videos / Code):</span>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={tempMediaType}
                    onChange={(e) => setTempMediaType(e.target.value as any)}
                    className="px-2 py-1.5 rounded bg-black border border-emerald-500/30 text-white"
                  >
                    <option value="image">Image (Photo)</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Asset Title"
                    value={tempMediaTitle}
                    onChange={(e) => setTempMediaTitle(e.target.value)}
                    className="px-2 py-1.5 rounded bg-black border border-emerald-500/30 text-white"
                  />
                  <input
                    type="url"
                    placeholder="Image/Video URL"
                    value={tempMediaUrl}
                    onChange={(e) => setTempMediaUrl(e.target.value)}
                    className="px-2 py-1.5 rounded bg-black border border-emerald-500/30 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Caption for this media..."
                    value={tempMediaCaption}
                    onChange={(e) => setTempMediaCaption(e.target.value)}
                    className="flex-1 px-2 py-1.5 rounded bg-black border border-emerald-500/30 text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddMediaToNewWeek}
                    className="px-3 py-1.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900"
                  >
                    + Attach
                  </button>
                </div>

                {newWeekData.mediaItems && newWeekData.mediaItems.length > 0 && (
                  <div className="text-[11px] text-emerald-400 pt-1">
                    {newWeekData.mediaItems.length} media item(s) attached to this week!
                  </div>
                )}
              </div>

              {/* Add Deliverable */}
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 space-y-2">
                <span className="text-emerald-400 font-bold block">Add Deliverable Task:</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Assembled motor driver circuit"
                    value={tempDeliverable}
                    onChange={(e) => setTempDeliverable(e.target.value)}
                    className="flex-1 px-2 py-1.5 rounded bg-black border border-emerald-500/30 text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-1.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900"
                  >
                    + Add Task
                  </button>
                </div>
                {newWeekData.deliverables && newWeekData.deliverables.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {newWeekData.deliverables.map((d, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/60 text-slate-300 text-[10px]">
                        ✓ {d.task}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-emerald-500/30">
                <button
                  type="button"
                  onClick={() => setIsAddingWeek(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-emerald-500 text-black font-tech font-bold hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                >
                  Publish Week Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
