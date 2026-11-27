from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
ROOT=Path(__file__).resolve().parents[1]
for name,file in [('Arial','arial.ttf'),('Arial-Bold','arialbd.ttf')]:
    pdfmetrics.registerFont(TTFont(name,'C:/Windows/Fonts/'+file))
styles={
 'name':ParagraphStyle('name',fontName='Arial-Bold',fontSize=22,leading=26,textColor=colors.HexColor('#162b40'),spaceAfter=3),
 'sub':ParagraphStyle('sub',fontName='Arial-Bold',fontSize=10,leading=14,spaceAfter=4),
 'body':ParagraphStyle('body',fontName='Arial',fontSize=9.5,leading=13,spaceAfter=4),
 'section':ParagraphStyle('section',fontName='Arial-Bold',fontSize=10,leading=14,textColor=colors.HexColor('#162b40'),spaceBefore=10,spaceAfter=5,borderWidth=0,borderPadding=0),
 'title':ParagraphStyle('title',fontName='Arial-Bold',fontSize=10,leading=14,spaceBefore=5,spaceAfter=2),
 'tech':ParagraphStyle('tech',fontName='Arial',fontSize=9,leading=12,textColor=colors.HexColor('#475569'),spaceAfter=3),
 'bullet':ParagraphStyle('bullet',fontName='Arial',fontSize=9.5,leading=13,leftIndent=10,firstLineIndent=-8,spaceAfter=2),
}
story=[]
def p(text,style='body'): story.append(Paragraph(text,styles[style]))
def b(text): p('- '+text,'bullet')
p('GAURAV SINGH RAJAWAT','name')
p('AI &amp; MACHINE LEARNING | BACKEND DEVELOPMENT','sub')
p('Gwalior, Madhya Pradesh, India | +91 9691680689 | <link href="mailto:gauravsingh288393@gmail.com">gauravsingh288393@gmail.com</link>')
p('<link href="https://www.linkedin.com/in/gaurav-singh-rajawat-44213b378/">linkedin.com/in/gaurav-singh-rajawat-44213b378</link> | <link href="https://github.com/ssh-gaurav">github.com/ssh-gaurav</link>','tech')
p('PROFILE','section')
p('B.Tech student in Artificial Intelligence and Machine Learning building RAG applications, predictive models, and FastAPI backends. Hands-on experience with retrieval workflows, data preprocessing, model evaluation, and real-time communication. Seeking opportunities to apply AI/ML and backend engineering skills to practical problems.')
p('EDUCATION','section')
p('B.Tech in Artificial Intelligence &amp; Machine Learning | 2025 - 2029','title')
p('MITS Gwalior, Madhya Pradesh | CGPA: 8.02 (through first year)')
p('TECHNICAL SKILLS','section')
for line in [
 '<b>Languages:</b> Python, C++, SQL, JavaScript, HTML, CSS',
 '<b>AI &amp; ML:</b> Scikit-learn, TensorFlow, Keras, Pandas, NumPy, regression, classification, clustering, PCA, ensemble learning, hyperparameter tuning',
 '<b>LLM applications:</b> RAG, LangChain, LangGraph, Transformers, Hugging Face, Groq, Tavily, prompt engineering, LLM APIs',
 '<b>Backend &amp; web:</b> FastAPI, REST APIs, WebSockets, PostgreSQL, Streamlit, React (basic)',
 '<b>Tools:</b> Git, GitHub, Jupyter Notebook, Google Colab, VS Code, SageMath, Matplotlib, Seaborn']:
 p(line)
p('SELECTED PROJECTS','section')
projects=[
 ('RogueAI | AI Research &amp; RAG Application','Jun - Aug 2026','Python, FastAPI, LangChain, RAG, Tavily, Hugging Face, React',[
 'Developed an AI research application combining retrieval-augmented generation with multi-agent workflows.',
 'Integrated Tavily web search, webpage extraction, and document processing; connected FastAPI RAG endpoints to a frontend for contextual, source-based responses.']),
 ('Rail Setu | Railway Maintenance Coordination Platform','Aug - Sep 2026','FastAPI, WebSockets, React',[
 'Designed a railway maintenance reporting and coordination platform with interfaces for field personnel and administrative teams.',
 'Integrated WebSockets for real-time communication across departments.']),
 ('Insurance Cost &amp; Heart Disease Prediction','Jan - Apr 2026','Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn',[
 'Built regression and classification models for insurance cost and heart disease prediction, covering preprocessing, exploratory analysis, feature engineering, and evaluation.',
 'Applied GridSearchCV and RandomizedSearchCV for hyperparameter tuning; visualized results with Matplotlib and Seaborn.']),
 ('Schnorr Digital Signature Scheme','Jan - May 2026','Python, SageMath, Jupyter Notebook',[
 'Implemented key generation, signing, and verification using modular arithmetic in SageMath; demonstrated the complete digital signature workflow.'])]
for title,date,tech,bullets in projects:
 p(title+' | '+date,'title');p(tech,'tech')
 for text in bullets:b(text)
p('PROBLEM SOLVING &amp; ACTIVITIES','section')
p('Practice data structures and algorithms on LeetCode using C++, including arrays, strings, hashing, linked lists, stacks, queues, trees, sliding windows, and two pointers. Participate in hackathons and collaborative projects.')
doc=SimpleDocTemplate(str(ROOT/'public/resume.pdf'),pagesize=(595.28,841.89),rightMargin=38,leftMargin=38,topMargin=30,bottomMargin=30,title='Gaurav Singh Rajawat - Resume',author='Gaurav Singh Rajawat')
doc.build(story)
from pypdf import PdfReader
r=PdfReader(ROOT/'public/resume.pdf')
assert len(r.pages)==1, f'Expected 1 page, got {len(r.pages)}'
assert 'Schnorr' in r.pages[0].extract_text()
print('Generated one-page resume; text extraction verified.')
