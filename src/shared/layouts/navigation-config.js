import { Hospital, LayoutGrid, Package, Users, Wrench } from 'lucide-react';

export const mainNavigationItems = [
  { path: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { path: '/funcionarios', icon: Hospital, label: 'Funcionários' },
  { path: '/pacientes', icon: Users, label: 'Pacientes' },
  { path: '/emprestimos', icon: Package, label: 'Empréstimos' },
  { path: '/servicos', icon: Wrench, label: 'Serviços' },
];
