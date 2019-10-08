const findClaimSchema = (schemas, schemaId) => {
  const [schema] = schemas.filter(item => item.id === schemaId);
  return schema;
};

const filterClaims = (claim, searchTerm) => {
  const filterVal = searchTerm.toLowerCase();
  if (!filterVal) {
    return true;
  }

  /* eslint-disable camelcase */
  const filterfields = (({
    schema_name,
    subject_label,
  }) => ({ schema_name, subject_label }))(claim);

  const claimContains = Object
    .values(filterfields)
    .some(val => val.toLowerCase().includes(filterVal));

  let contentContains = false;
  Object.keys(claim.content).forEach((key) => {
    if (claim.content[key].toString().includes(filterVal)) {
      contentContains = true;
    }
  });

  return claimContains || contentContains;
};

const getClaimValue = (claim, schemas) => {
  const schema = findClaimSchema(schemas, claim.schema_id);
  const values = [];
  if (!schema) {
    return values;
  }

  if (schema.ordering.length === 0) {
    Object.keys(claim.content).forEach((key) => {
      values.push(claim.content[key]);
    });
  } else {
    schema.ordering.forEach((key) => {
      values.push(claim.content[key]);
    });
  }
  return values.join(' ');
};

const getClaimTableItems = (claims, schemas, searchTerm, showDidLabel) => claims
  .filter(claim => filterClaims(claim, searchTerm))
  .map((claim) => {
    const row = {
      name: claim.schema_name,
      value: getClaimValue(claim, schemas),
      claim,
    };

    if (showDidLabel) {
      row.persona = claim.subject_label;
    }

    return row;
  });


export {
  getClaimTableItems as default,
};
