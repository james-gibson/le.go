import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import DocPage from './pages/DocPage'
import SectionIndex from './pages/SectionIndex'
import Philosophy from './pages/Philosophy'
import Projector from './pages/Projector'
import Draft from './pages/Draft'
import Design from './pages/Design'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs" element={<SectionIndex section="docs" />} />
        <Route path="docs/:slug" element={<DocPage section="docs" />} />
        <Route path="seeds" element={<SectionIndex section="seeds" />} />
        <Route path="seeds/:slug" element={<DocPage section="seeds" />} />
        <Route path="isotopes" element={<SectionIndex section="isotopes" />} />
        <Route path="isotopes/:slug" element={<DocPage section="isotopes" />} />
        <Route path="philosophy" element={<Philosophy />} />
        <Route path="projector" element={<Projector />} />
        <Route path="draft" element={<Draft />} />
        <Route path="design" element={<Design />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
