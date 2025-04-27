

function LanguageSelector({hasAccess}: {hasAccess: boolean}) {
  return (
    <div>
      {hasAccess ? 'gang' : 'by'}
    </div>
  )
}

export default LanguageSelector