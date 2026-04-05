import '@testing-library/jest-dom/vitest'

// Global mocks for react-icons and sweetalert2
vi.mock('react-icons/bs', () => ({
  BsTrash3: () => null,
}))

vi.mock('react-icons/md', () => ({
  MdCheckCircleOutline: () => null,
}))

vi.mock('react-icons/fi', () => ({
  FiEdit3: () => null,
  FiSun: () => null,
  FiMoon: () => null,
}))

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: false }),
  },
}))

vi.mock('sweetalert2-react-content', () => ({
  default: (lib) => lib,
}))
