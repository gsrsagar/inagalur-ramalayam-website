import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { useData } from '../context/DataContext';

const pageKeys = [
  {
    id: 'home',
    label: 'Home Page',
    fields: [
      { key: 'home_heroTitle', label: 'Hero Title', type: 'text' },
      { key: 'home_heroSubtitle', label: 'Hero Subtitle', type: 'text' },
      { key: 'home_welcomeMessage', label: 'Welcome Message', type: 'textarea' },
      { key: 'home_aboutText', label: 'About Text', type: 'textarea' },
    ],
  },
  {
    id: 'about',
    label: 'About Page',
    fields: [
      { key: 'about_history', label: 'History', type: 'textarea' },
      { key: 'about_vision', label: 'Vision', type: 'textarea' },
      { key: 'about_mission', label: 'Mission', type: 'textarea' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    fields: [
      { key: 'services_poojaTimings', label: 'Pooja Timings', type: 'textarea' },
      { key: 'services_specialEvents', label: 'Special Events', type: 'textarea' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    fields: [
      { key: 'contact_address', label: 'Address', type: 'textarea' },
      { key: 'contact_phone', label: 'Phone', type: 'text' },
      { key: 'contact_email', label: 'Email', type: 'text' },
    ],
  },
  {
    id: 'footer',
    label: 'Footer',
    fields: [
      { key: 'footer_copyright', label: 'Copyright Text', type: 'text' },
      { key: 'footer_description', label: 'Description', type: 'textarea' },
    ],
  },
];

const PageSection = ({ page, translations, saveTranslation }) => {
  const [lang, setLang] = useState('en');
  const [values, setValues] = useState({});

  const currentVal = (key) =>
    values[key] !== undefined ? values[key] : translations?.[key]?.[lang] ?? '';

  const handleSave = (key) => {
    const val = values[key];
    saveTranslation(key, lang, val !== undefined ? val : translations?.[key]?.[lang] ?? '');
  };

  return (
    <div
      style={{
        marginBottom: '24px',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ marginBottom: '12px' }}>{page.label}</h3>
      <div style={{ marginBottom: '12px' }}>
        {['en', 'te', 'kn'].map((l) => (
          <button
            key={l}
            className={lang === l ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setLang(l)}
            style={{ marginRight: '6px' }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      {page.fields.map((field) => (
        <div key={field.key} className="form-group">
          <label className="form-label">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              className="form-input"
              rows={3}
              value={currentVal(field.key)}
              onChange={(e) =>
                setValues((p) => ({ ...p, [field.key]: e.target.value }))
              }
            />
          ) : (
            <input
              className="form-input"
              value={currentVal(field.key)}
              onChange={(e) =>
                setValues((p) => ({ ...p, [field.key]: e.target.value }))
              }
            />
          )}
          <button
            className="btn-primary"
            onClick={() => handleSave(field.key)}
            style={{ marginTop: '4px' }}
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

const TranslationRow = ({ translations, saveTranslation }) => {
  const [lang, setLang] = useState('en');
  const [values, setValues] = useState({});

  const keys = Object.keys(translations || {});

  const handleSave = (key) => {
    const val = values[key];
    saveTranslation(key, lang, val !== undefined ? val : translations?.[key]?.[lang] ?? '');
    setValues((p) => {
      const next = { ...p };
      delete next[key];
      return next;
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        {['en', 'te', 'kn'].map((l) => (
          <button
            key={l}
            className={lang === l ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setLang(l)}
            style={{ marginRight: '6px' }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
        {keys.length === 0 && <p>No translations found.</p>}
        {keys.map((key) => (
          <div
            key={key}
            className="form-group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '6px',
            }}
          >
            <span style={{ minWidth: '160px', fontWeight: 600, fontSize: '13px' }}>
              {key}
            </span>
            <input
              className="form-input"
              style={{ flex: 1 }}
              value={values[key] ?? translations[key]?.[lang] ?? ''}
              onChange={(e) =>
                setValues((p) => ({ ...p, [key]: e.target.value }))
              }
            />
            <button className="btn-primary" onClick={() => handleSave(key)}>
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const CrudSection = ({
  title,
  fields,
  items,
  itemType,
  onAdd,
  onUpdate,
  onDelete,
  onUpload,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setForm({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    const initial = {};
    fields.forEach((f) => {
      if (f.type !== 'image' && f.type !== 'file') {
        initial[f.name] = item[f.name] || '';
      }
    });
    if (fields.some((f) => f.type === 'image')) {
      const imgField = fields.find((f) => f.type === 'image');
      if (item[imgField.name]) initial[imgField.name] = item[imgField.name];
    }
    setForm(initial);
    setEditingId(item._id || item.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (editingId) {
        await onUpdate(itemType, editingId, payload);
      } else {
        await onAdd(itemType, payload);
      }
      resetForm();
    } catch (err) {
      console.error(`Failed to save ${itemType}:`, err);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await onDelete(itemType, id);
      } catch (err) {
        console.error(`Failed to delete ${itemType}:`, err);
      }
    }
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await onUpload(file);
      setForm((p) => ({ ...p, [fieldName]: url }));
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  const renderField = (f) => {
    switch (f.type) {
      case 'textarea':
        return (
          <textarea
            className="form-input"
            rows={3}
            placeholder={f.label}
            value={form[f.name] || ''}
            onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
            required={f.required}
          />
        );
      case 'date':
        return (
          <input
            className="form-input"
            type="date"
            value={form[f.name] || ''}
            onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
            required={f.required}
          />
        );
      case 'number':
        return (
          <input
            className="form-input"
            type="number"
            step="any"
            placeholder={f.label}
            value={form[f.name] || ''}
            onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
            required={f.required}
          />
        );
      case 'image':
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, f.name)}
            />
            {form[f.name] && (
              <div style={{ marginTop: '4px' }}>
                <img
                  src={form[f.name]}
                  alt="preview"
                  style={{
                    width: '100px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </div>
            )}
          </div>
        );
      default:
        return (
          <input
            className="form-input"
            type="text"
            placeholder={f.label}
            value={form[f.name] || ''}
            onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
            required={f.required}
          />
        );
    }
  };

  const imgField = fields.find((f) => f.type === 'image');

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <button
          className={showForm ? 'btn-secondary' : 'btn-primary'}
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
        >
          {showForm ? 'Cancel' : `Add New ${title.slice(0, -1)}`}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginBottom: '24px',
            padding: '16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h4 style={{ marginBottom: '12px' }}>
            {editingId ? 'Edit' : 'Add'} {title.slice(0, -1)}
          </h4>
          {fields.map((f) => (
            <div key={f.name} className="form-group">
              <label className="form-label">{f.label}</label>
              {renderField(f)}
            </div>
          ))}
          <button
            className="btn-primary"
            type="submit"
            disabled={saving}
            style={{ marginTop: '8px' }}
          >
            {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
          </button>
        </form>
      )}

      {(!items || items.length === 0) && (
        <p>No {title.toLowerCase()} found.</p>
      )}

      <div
        style={{
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}
      >
        {(items || []).map((item) => {
          const id = item._id || item.id;
          return (
            <div
              key={id}
              style={{
                padding: '12px',
                border: '1px solid #eee',
                borderRadius: '8px',
                background: '#fafafa',
              }}
            >
              {imgField && item[imgField.name] && (
                <img
                  src={item[imgField.name]}
                  alt=""
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '8px',
                  }}
                />
              )}
              {fields
                .filter((f) => f.type !== 'image' && f.type !== 'file')
                .map((f) => (
                  <p key={f.name} style={{ margin: '4px 0', fontSize: '14px' }}>
                    <strong>{f.label}:</strong>{' '}
                    {f.type === 'textarea'
                      ? (item[f.name] || '').substring(0, 100)
                      : f.type === 'number'
                        ? Number(item[f.name]).toLocaleString()
                        : item[f.name] || '—'}
                  </p>
                ))}
              <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                <button
                  className="btn-secondary"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn-secondary"
                  style={{ background: '#e74c3c', color: '#fff' }}
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Admin = () => {
  const { user, logout } = useAuth();
  const { translations, saveTranslation } = useContent();
  const {
    events,
    members,
    donations,
    activities,
    loading,
    addItem,
    updateItem,
    deleteItem,
    uploadImage,
  } = useData();

  const [activeTab, setActiveTab] = useState('Pages');

  if (!user) {
    return (
      <div className="admin-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <p>Please login from footer</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-panel" style={{ padding: '40px', textAlign: 'center' }}>
        Loading...
      </div>
    );
  }

  const tabs = ['Pages', 'Translations', 'Events', 'Members', 'Donations', 'Activities'];

  const eventsFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'image', label: 'Image', type: 'image' },
  ];

  const membersFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'designation', label: 'Designation', type: 'text', required: true },
    { name: 'village', label: 'Village', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'photo', label: 'Photo', type: 'image' },
    { name: 'bio', label: 'Bio', type: 'textarea' },
  ];

  const donationsFields = [
    { name: 'donorName', label: 'Donor Name', type: 'text', required: true },
    { name: 'amount', label: 'Amount', type: 'number', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'purpose', label: 'Purpose', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
  ];

  const activitiesFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'time', label: 'Time', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'image', label: 'Image', type: 'image' },
  ];

  return (
    <div
      className="admin-panel"
      style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '12px',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setActiveTab(tab)}
            style={{ marginRight: '4px' }}
          >
            {tab}
          </button>
        ))}
        <button
          className="btn-secondary"
          onClick={logout}
          style={{
            marginLeft: 'auto',
            background: '#e74c3c',
            color: '#fff',
          }}
        >
          Logout
        </button>
      </div>

      {activeTab === 'Pages' && (
        <div>
          <h2>Page Content Editor</h2>
          {pageKeys.map((page) => (
            <PageSection
              key={page.id}
              page={page}
              translations={translations}
              saveTranslation={saveTranslation}
            />
          ))}
        </div>
      )}

      {activeTab === 'Translations' && (
        <div>
          <h2>All Translations</h2>
          <TranslationRow
            translations={translations}
            saveTranslation={saveTranslation}
          />
        </div>
      )}

      {activeTab === 'Events' && (
        <div>
          <h2>Past Events</h2>
          <CrudSection
            title="Events"
            fields={eventsFields}
            items={events}
            itemType="events"
            onAdd={addItem}
            onUpdate={updateItem}
            onDelete={deleteItem}
            onUpload={uploadImage}
          />
        </div>
      )}

      {activeTab === 'Members' && (
        <div>
          <h2>Temple Members</h2>
          <CrudSection
            title="Members"
            fields={membersFields}
            items={members}
            itemType="members"
            onAdd={addItem}
            onUpdate={updateItem}
            onDelete={deleteItem}
            onUpload={uploadImage}
          />
        </div>
      )}

      {activeTab === 'Donations' && (
        <div>
          <h2>Donations</h2>
          <CrudSection
            title="Donations"
            fields={donationsFields}
            items={donations}
            itemType="donations"
            onAdd={addItem}
            onUpdate={updateItem}
            onDelete={deleteItem}
            onUpload={uploadImage}
          />
        </div>
      )}

      {activeTab === 'Activities' && (
        <div>
          <h2>Upcoming Activities</h2>
          <CrudSection
            title="Activities"
            fields={activitiesFields}
            items={activities}
            itemType="activities"
            onAdd={addItem}
            onUpdate={updateItem}
            onDelete={deleteItem}
            onUpload={uploadImage}
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
