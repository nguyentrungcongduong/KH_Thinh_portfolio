/**
 * Portfolio Data - Phan Hùng Thịnh
 * Centralized content file. Update info here, components pull automatically.
 */

export const personalInfo = {
  name: 'Phan Hùng Thịnh',
  title: 'Thực tập sinh Business Analyst',
  phone: '0XXX XXX XXX',
  email: 'thinh.phan@email.com',
  address: 'Quận 12, TP. Hồ Chí Minh',
  quote: '"Turning business complexity into structured clarity - one process at a time."',
  summary:
    'Sinh viên năm cuối ngành Hệ thống Thông tin Quản lý tại Đại học GTVT TP.HCM (UTH), đam mê phân tích nghiệp vụ và tối ưu hoá quy trình doanh nghiệp. Có kinh nghiệm thực tế trong việc khảo sát yêu cầu, mô hình hoá quy trình (BPMN), phân tích GAP, và viết tài liệu SRS. Luôn tìm kiếm cơ hội để áp dụng tư duy hệ thống vào giải quyết vấn đề thực tiễn.',
  goals: {
    shortTerm:
      'Trở thành Business Analyst chính thức tại một công ty công nghệ, tích luỹ kinh nghiệm thực tế trong các dự án chuyển đổi số.',
    longTerm:
      'Phát triển thành Senior BA / Product Owner, dẫn dắt các dự án phức tạp và đóng góp vào chiến lược số hoá doanh nghiệp.',
  },
  interests: [
    'Đọc sách về Business Analysis & Product Management',
    'Phân tích dữ liệu và trực quan hoá với Power BI',
    'Tìm hiểu về Design Thinking & Lean Startup',
    'Viết blog chia sẻ kiến thức BA',
  ],
  links: {
    linkedin: '#',
    github: '#',
    cvPdf: 'https://drive.google.com/file/d/1eRIkaF3HNpZjzcDtnYL8S0-NdkR9t-tI/view?usp=sharing',
    drive: '#',
  },
}

export const projects = [
  {
    id: 1,
    name: 'Phân tích & Tối ưu Quy trình Nghiệp vụ',
    period: '09/2024 - 12/2024',
    context:
      'Doanh nghiệp gặp khó khăn trong việc quản lý quy trình xử lý đơn hàng, gây ra nhiều bước thừa và thời gian xử lý kéo dài. Cần phân tích hiện trạng và đề xuất cải tiến.',
    role: 'Business Analyst - làm việc nhóm 4 người, đảm nhiệm phần khảo sát hiện trạng và vẽ sơ đồ BPMN.',
    description:
      'Khảo sát quy trình hiện tại (AS-IS), phân tích điểm nghẽn, đề xuất quy trình cải tiến (TO-BE) bằng BPMN 2.0. Xây dựng báo cáo phân tích chi tiết và trình bày cho stakeholders.',
    tools: ['BPMN 2.0', 'Draw.io', 'Microsoft Visio', 'Excel', 'PowerPoint'],
    results:
      'Đề xuất quy trình TO-BE giúp giảm 30% thời gian xử lý đơn hàng, loại bỏ 3 bước thừa trong quy trình.',
    lessons:
      'Học được cách đặt câu hỏi đúng khi khảo sát stakeholders, và tầm quan trọng của việc validate quy trình với người dùng cuối.',
    images: [
      {
        src: '/du_an1/du_an1.png',
        alt: 'Power/Interest Grid - Shopee',
        caption: 'Power/Interest Grid - Shopee',
      },
      {
        src: '/du_an1/du_an1.1.png',
        alt: 'Ma tran RASCI - Shopee',
        caption: 'Ma tran RASCI - Shopee',
      },
      {
        src: '/du_an1/du_an1.2.png',
        alt: 'BPMN As-is - Quy trinh dang san pham',
        caption: 'BPMN As-is - Quy trinh dang san pham',
      },
      {
        src: '/du_an1/du_an1.3.png',
        alt: 'Sequence Diagram - Tham gia khuyen mai va Marketing',
        caption: 'Sequence Diagram - Tham gia khuyen mai va Marketing',
      },
      {
        src: '/du_an1/du_an1.4.png',
        alt: 'Sequence Diagram - Xu ly thanh toan',
        caption: 'Sequence Diagram - Xu ly thanh toan',
      },
      {
        src: '/du_an1/du_an1.5.png',
        alt: 'Activity Diagram - Tim kiem san pham',
        caption: 'Activity Diagram - Tim kiem san pham',
      },
    ],
    links: { drive: '#', figma: '#' },
  },
  {
    id: 2,
    name: 'Phân tích GAP & Viết SRS cho Hệ thống ERP',
    period: '01/2025 - 04/2025',
    context:
      'Công ty đang triển khai hệ thống ERP mới, cần phân tích khoảng cách giữa quy trình hiện tại và tính năng hệ thống, đồng thời xây dựng tài liệu đặc tả yêu cầu.',
    role: 'Business Analyst - làm việc nhóm 3 người, đảm nhiệm phân tích GAP và viết tài liệu SRS cho module quản lý kho.',
    description:
      'Thực hiện phân tích GAP giữa quy trình AS-IS và tính năng hệ thống ERP. Viết tài liệu SRS theo chuẩn IEEE 830 cho module quản lý kho, bao gồm use case, business rules, và data dictionary.',
    tools: ['GAP Analysis', 'IEEE 830 SRS', 'Word', 'Excel', 'Draw.io', 'SQL'],
    results:
      'Hoàn thành tài liệu SRS 45 trang cho module quản lý kho, xác định được 12 GAP items và đề xuất giải pháp cho từng item.',
    lessons:
      'Hiểu sâu hơn về cách cấu trúc tài liệu SRS chuyên nghiệp và tầm quan trọng của traceability matrix.',
    images: [
      {
        src: '/du_an2/du_an2.png',
        alt: 'Rich Picture - Tong quan quy trinh he thong',
        caption: 'Rich Picture - Tong quan quy trinh he thong',
      },
      {
        src: '/du_an2/du_an2.1.png',
        alt: 'So do cau truc to chuc',
        caption: 'So do cau truc to chuc',
      },
      {
        src: '/du_an2/du_an2.2.png',
        alt: 'Use Case - Goi y fill hang',
        caption: 'Use Case - Goi y fill hang',
      },
      {
        src: '/du_an2/du_an2.3.png',
        alt: 'Use Case - Tao dot cham hang',
        caption: 'Use Case - Tao dot cham hang',
      },
      {
        src: '/du_an2/du_an2.4.png',
        alt: 'Sequence Diagram - Dang nhap',
        caption: 'Sequence Diagram - Dang nhap',
      },
      {
        src: '/du_an2/du_an2.5.png',
        alt: 'Sequence Diagram - Tao dot cham hang',
        caption: 'Sequence Diagram - Tao dot cham hang',
      },
    ],
    links: {
      drive: '#',
      github: 'https://github.com/hunggthinhh/HTTTQL',
    },
  },
  {
    id: 3,
    name: 'La Pâtisserie - Website Đặt Bánh Online',
    period: '03/2025 - 06/2025',
    context:
      'Tiệm bánh La Pâtisserie muốn xây dựng kênh bán hàng online, cần phân tích yêu cầu và thiết kế hệ thống đặt bánh trực tuyến.',
    role: 'Business Analyst kiêm System Analyst - làm việc nhóm 5 người, đảm nhiệm phân tích yêu cầu, vẽ UML diagrams, và phối hợp với team dev.',
    description:
      'Thu thập yêu cầu từ chủ tiệm, xây dựng Use Case Diagram, Activity Diagram, Sequence Diagram cho các chức năng chính. Viết user stories và acceptance criteria. Phối hợp với team frontend/backend để đảm bảo tính nhất quán giữa yêu cầu và sản phẩm.',
    tools: [
      'UML',
      'Use Case Diagram',
      'Activity Diagram',
      'Sequence Diagram',
      'Figma',
      'Draw.io',
      'Jira',
      'HTML/CSS',
    ],
    results:
      'Hoàn thành phân tích yêu cầu và thiết kế cho 8 use cases chính. Website được deploy thành công với đầy đủ chức năng đặt bánh online.',
    lessons:
      'Kinh nghiệm làm việc trực tiếp với team dev, hiểu rõ hơn về Agile workflow và cách viết user stories hiệu quả.',
    images: [
      {
        src: '/du_an3/du_an3.png',
        alt: 'Sequence Diagram - Dang ky',
        caption: 'Sequence Diagram - Dang ky',
      },
      {
        src: '/du_an3/du_an3.1.png',
        alt: 'Sequence Diagram - Dang nhap',
        caption: 'Sequence Diagram - Dang nhap',
      },
      {
        src: '/du_an3/du_an3.2.png',
        alt: 'Sequence Diagram - Quen mat khau',
        caption: 'Sequence Diagram - Quen mat khau',
      },
      {
        src: '/du_an3/du_an3.3.png',
        alt: 'Sequence Diagram - Tim kiem san pham',
        caption: 'Sequence Diagram - Tim kiem san pham',
      },
    ],
    links: {
      drive: '#',
      figma: '#',
      demo: '#',
      github: 'https://github.com/hunggthinhh/Web_banhang',
    },
  },
]

export const skills = {
  baSkills: [
    { name: 'Requirements Elicitation', desc: 'Phỏng vấn, khảo sát, workshop' },
    { name: 'Process Modeling', desc: 'BPMN 2.0, AS-IS / TO-BE' },
    { name: 'UML Diagrams', desc: 'Use Case, Activity, Sequence' },
    { name: 'GAP Analysis', desc: 'Phân tích khoảng cách hệ thống' },
    { name: 'Documentation', desc: 'SRS (IEEE 830), BRD, User Stories' },
    { name: 'Data Analysis', desc: 'SQL queries, Data Dictionary' },
  ],
  tools: [
    { name: 'Draw.io', category: 'Modeling' },
    { name: 'Microsoft Visio', category: 'Modeling' },
    { name: 'Figma', category: 'Design' },
    { name: 'Jira', category: 'Project Mgmt' },
    { name: 'SQL', category: 'Data' },
    { name: 'Excel / Google Sheets', category: 'Data' },
    { name: 'Power BI', category: 'Analytics' },
    { name: 'Word / Google Docs', category: 'Documentation' },
    { name: 'PowerPoint', category: 'Presentation' },
    { name: 'HTML / CSS', category: 'Web' },
  ],
}

export const education = {
  school: 'Đại học Giao thông Vận tải TP.HCM (UTH)',
  major: 'Hệ thống Thông tin Quản lý',
  degree: 'Cử nhân',
  gpa: '3.37 / 4.0',
  period: '2021 - 2025',
}

export const certifications = [
  {
    name: 'Microsoft Office Specialist - Associate',
    issuer: 'Microsoft',
    date: '2025',
    image: '/mos.png',
    url: 'https://drive.google.com/file/d/19YHQMBJcSWC0WykoXC2h37FjZIOEMbKy/view?usp=sharing',
  },
  {
    name: 'Google Cloud Computing Certificate',
    issuer: 'Google Cloud - Credly',
    date: '2025',
    image: '/gg.png',
    url: 'https://www.credly.com/badges/aa2988ac-c2ae-463f-a11c-4dadc8ed7764/facebook?fbclid=IwY2xjawTFmnpleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeZcb7swZnaxGZ17nb1KW2MhzzB1sOfRj2faR9Ebqbay1FSVw7SAEcJtbwpGs_aem_YXd10lnpqIzwoMFC8f1BFA',
  },
]

export const languages = [
  { name: 'Tiếng Việt', level: 'Bản ngữ' },
  { name: 'Tiếng Anh', level: 'B2 - Giao tiếp tốt, đọc hiểu tài liệu chuyên ngành' },
]
