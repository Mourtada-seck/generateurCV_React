import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


function FormulaireCV() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    competence: '',
    experience: '',
    formation: '',
    theme: 'clair'

  });
  
  const generatePDF = () => {
  const cvElement = document.getElementById('cv-preview');
  html2canvas(cvElement).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('mon_cv.pdf');
  });
};


  const [photoPreview, setPhotoPreview] = useState(null);
  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getThemeClass = () => {
  switch (formData.theme) {
    case 'sombre':
      return 'bg-dark text-white';
    case 'bleu':
      return 'bg-primary text-white';
    default:
      return 'bg-white text-dark';
  }
};

  const Section = ({ title, content }) => (
  <div className="mb-4">
    <h5 className="border-bottom pb-1 text-uppercase fw-semibold text-primary">
      {title}
    </h5>
    <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {content}
    </p>
  </div>
);





  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend plus tard
    console.log('Formulaire soumis', formData);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Création de CV</h2>
      <div className="row">
        {/* Formulaire */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <div className="mb-3">
              <label>Nom</label>
              <input type="text" name="nom" onChange={handleChange} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label>Prénom</label>
              <input type="text" name="prenom" onChange={handleChange} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label>Photo</label>
              <input type="file" name="photo" accept="image/*" onChange={(e) => handleImageChange(e)} className="form-control" />
            </div>

            <div className="mb-3">
              <label>Email</label>
              
              <input type="email" name="email" onChange={handleChange} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label>Téléphone</label>
              <input type="number" name="telephone" onChange={handleChange} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label>Compétences</label>
              <textarea name="competence" onChange={handleChange} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label>Expériences</label>
            <textarea name="experience" onChange={handleChange} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label>Formations</label>
              <textarea name="formation" onChange={handleChange} className="form-control" required/>
            </div>
            <div className="mb-3">
              <label>Thème du CV</label>
              <select name="theme" onChange={handleChange} className="form-select">
                <option value="clair">Clair</option>
                <option value="sombre">Sombre</option>
                <option value="bleu">Bleu</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Continuer</button>
          </form>
        </div>

        {/* Prévisualisation */}
      <div className="col-md-6">
          <div id="cv-preview" className={`border p-4 rounded shadow-sm ${getThemeClass()}`} style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
              <h3 className="text-center">Aperçu du CV</h3>
              <div className="row">
                {/* Colonne gauche : Photo + Infos personnelles */}
              <div className="col-md-4 text-center border-end pe-3">
                {photoPreview && (
                <img
                src={photoPreview}
                alt="Photo"
                className="img-fluid rounded-circle mb-3"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
              )}
                <h4 className="fw-bold">{formData.prenom} {formData.nom}</h4>
                <p className="mb-1"><i className="bi bi-envelope-fill me-2 text-primary"></i><strong>Email:</strong> {formData.email}</p>
                <p className="mb-1"> <i className="bi bi-telephone-fill me-2 text-primary"></i><strong>Téléphone:</strong> {formData.telephone}</p>
              </div>

              {/* Colonne droite : contenu du CV */}
              <div className="col-md-8 ps-4">
                <Section title="Compétences" content={formData.competence} />
                <Section title="Expériences" content={formData.experience} />
                <Section title="Formations" content={formData.formation} />
              </div>
      </div>
          </div>
          
          <div className="text-center mt-3">
            <button onClick={generatePDF} className="btn btn-success">
              Télécharger mon CV en PDF
            </button>
          </div>
      </div>

      </div>
    </div>
  );
  
}

export default FormulaireCV;
