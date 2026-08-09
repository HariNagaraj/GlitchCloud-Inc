import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

export const ModalForm = React.memo(({ schema, item, config, onClose, onSave }) => {
  const [formData, setFormData] = useState(item || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderField = useCallback((field) => {
    const value = formData[field.name] || '';
    
    if (field.type === 'select') {
      let options = [];
      if (Array.isArray(field.options)) {
        options = field.options;
      } else {
        options = (config[field.options] || []).map(opt => ({
          value: field.options === 'roles' ? opt.tierName : (opt.id || opt.name || opt.tierName),
          label: opt.name || opt.tierName
        }));
      }

      return (
        <CustomSelect 
          key={field.name}
          label={field.label}
          value={value}
          options={options}
          placeholder={`Select ${field.label}`}
          onChange={(val) => setFormData(prev => ({ ...prev, [field.name]: val }))}
          required={field.required}
        />
      );
    }

    return (
      <div key={field.name} className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">{field.label}</label>
        <input 
          required={field.required}
          type={field.type}
          placeholder={field.placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary transition-colors text-white font-medium placeholder:text-neutral-600"
          value={value}
          onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
        />
      </div>
    );
  }, [formData, config]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-2xl bg-[#12121A] border border-white/10 rounded-[40px] p-10 relative shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
        
        <button 
          type="button"
          onClick={onClose} 
          className="absolute top-8 right-8 p-3 text-neutral hover:text-white hover:bg-white/5 rounded-full transition-all z-50"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-2 relative z-10">{item ? 'Modify' : 'Create'} {schema.title}</h2>
        <p className="text-neutral mb-8 relative z-10">Enter organizational parameters to sync GlitchCloud systems.</p>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="flex flex-wrap gap-4">
            {schema.fields.map(renderField)}
          </div>

          <div className="pt-6 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-bold tracking-widest uppercase transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-primary text-white rounded-full text-sm font-bold tracking-widest uppercase shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:scale-[1.02]"
            >
              {item ? 'Sync Changes' : 'Initialize Record'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
});
