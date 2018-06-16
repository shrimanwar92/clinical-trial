var factory = getFactory();
var namespace = 'org.acme.ClinicalTrial';

/**
 * Published transaction processor function.
 * @param {org.acme.ClinicalTrial.PhaseOneTrail} tx The phase one clinical trial transaction instance.
 * @transaction
 */

 async function PhaseOneTrail(tx) {
 	const phaseone = factory.newConcept(namespace, 'PhaseOne');
 	phaseone.startdate = tx.startdate;
 	phaseone.enddate = tx.enddate;
 	phaseone.volunteers = tx.volunteers;
 	phaseone.purpose = tx.purpose;
 	phaseone.dosage = tx.dosage;

 	tx.drug.p1 = phaseone;

 	let assetRegistry = await getAssetRegistry('org.acme.ClinicalTrial.Drug');
    await assetRegistry.update(tx.drug);
 }